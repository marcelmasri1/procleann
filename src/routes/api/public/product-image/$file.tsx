import { createFileRoute } from "@tanstack/react-router";

/** Serves an admin-uploaded product photo from private storage.
 * Read-only, images only — nothing else in the bucket is exposed. */
export const Route = createFileRoute("/api/public/product-image/$file")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const file = String(params.file ?? "");
        if (!/^[A-Za-z0-9._-]+$/.test(file)) return new Response("Not found", { status: 404 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("product-images").download(file);
        if (error || !data) return new Response("Not found", { status: 404 });

        return new Response(await data.arrayBuffer(), {
          headers: {
            "content-type": data.type || "image/png",
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
