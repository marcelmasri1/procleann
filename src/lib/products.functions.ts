import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

function anonClient() {
  return import("@supabase/supabase-js").then(({ createClient }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    return createClient(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input: RequestInfo | URL, init?: RequestInit) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
            h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
  });
}

/** Checks a submitted password against the ADMIN_PASSWORD secret. Never
 * returns or leaks the real password - only a boolean. */
function checkAdminPassword(password: string) {
  const real = process.env["ADMIN_PASSWORD"];
  if (!real) {
    console.error("[admin] ADMIN_PASSWORD secret is not set.");
    return false;
  }
  return password === real;
}

export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = await anonClient();
  const { data, error } = await supabase.from("products").select("*").order("sort_order");
  if (error) {
    console.error("listProducts failed:", error.message);
    return [];
  }
  return data;
});

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ password: z.string() }).parse(data))
  .handler(async ({ data }) => ({ ok: checkAdminPassword(data.password) }));

const productSchema = z.object({
  id: z.string().trim().min(1).max(40),
  image_url: z.string().trim().max(500).optional().nullable(),
  price: z.number().min(0).max(10000000),
  size: z.string().trim().max(40),
  category: z.enum(["surface", "laundry", "dish", "care"]),
  color: z.string().trim().max(20),
  panel: z.string().trim().max(20),
  name_en: z.string().trim().min(1).max(160),
  desc_en: z.string().trim().max(600),
  name_ar: z.string().trim().max(160),
  desc_ar: z.string().trim().max(600),
  sort_order: z.number().int().min(0).max(9999),
});

export const adminUpsertProduct = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ password: z.string(), product: productSchema }).parse(data),
  )
  .handler(async ({ data }) => {
    if (!checkAdminPassword(data.password)) return { ok: false as const, error: "bad_password" };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // NOTE: the generated Database type doesn't know about `products` yet
    // (types.ts is generated from the live schema, which we can't reach
    // from here). Cast to keep this working until it's regenerated.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabaseAdmin as any)
      .from("products")
      .upsert({ ...data.product, updated_at: new Date().toISOString() });

    if (error) {
      console.error("adminUpsertProduct failed:", error.message);
      return { ok: false as const, error: error.message };
    }
    return { ok: true as const };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ password: z.string(), id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    if (!checkAdminPassword(data.password)) return { ok: false as const, error: "bad_password" };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabaseAdmin as any).from("products").delete().eq("id", data.id);

    if (error) {
      console.error("adminDeleteProduct failed:", error.message);
      return { ok: false as const, error: error.message };
    }
    return { ok: true as const };
  });

/** Admin image upload: stores the file in private storage and returns the
 * public read-only URL the storefront should use. */
export const adminUploadImage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        password: z.string(),
        filename: z.string().trim().min(1).max(120),
        dataUrl: z.string().max(14_000_000),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    if (!checkAdminPassword(data.password)) return { ok: false as const, error: "bad_password" };

    const match = /^data:(image\/[a-z+]+);base64,(.+)$/i.exec(data.dataUrl);
    if (!match) return { ok: false as const, error: "not_an_image" };
    const contentType = match[1]!;
    const bytes = Buffer.from(match[2]!, "base64");
    if (bytes.byteLength > 8_000_000) return { ok: false as const, error: "too_large" };

    const ext = (contentType.split("/")[1] ?? "png").replace("jpeg", "jpg");
    const safe = data.filename.replace(/[^A-Za-z0-9._-]/g, "-").slice(0, 60);
    const key = `${Date.now()}-${safe}`.replace(/\.[^.]*$/, "") + `.${ext}`;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage
      .from("product-images")
      .upload(key, bytes, { contentType, upsert: true });

    if (error) {
      console.error("adminUploadImage failed:", error.message);
      return { ok: false as const, error: error.message };
    }
    return { ok: true as const, url: `/api/public/product-image/${key}` };
  });
