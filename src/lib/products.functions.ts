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
  price: z.number().min(0).max(10000),
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
