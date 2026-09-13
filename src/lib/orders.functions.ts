import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const orderSchema = z.object({
  customer_name: z.string().trim().min(2).max(80),
  customer_phone: z.string().trim().min(6).max(30),
  address: z.string().trim().max(300).optional().default(""),
  note: z.string().trim().max(500).optional().default(""),
  items: z
    .array(
      z.object({
        id: z.string().max(20),
        name: z.string().max(160),
        qty: z.number().int().min(1).max(99),
        price: z.number().min(0).max(10000000),
      }),
    )
    .min(1)
    .max(50),
  total: z.number().min(0).max(100000000),
});

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("orders").insert({
      customer_name: data.customer_name,
      customer_phone: data.customer_phone,
      address: data.address || null,
      note: data.note || null,
      items: data.items,
      total: data.total,
    });

    if (error) {
      console.error("placeOrder failed:", error.message);
      return { ok: false as const, error: error.message };
    }
    return { ok: true as const };
  });
