import { PRODUCTS, type Category, type Product } from "@/data/products";

/** Bundled photo for each original product, keyed by its seed id. */
const SEED_IMAGES: Record<string, string> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p.image]),
);

export type ProductRow = {
  id: string;
  seed_key?: string | null;
  image_url?: string | null;
  price: number | string;
  size: string;
  category: string;
  color: string;
  panel: string;
  name_en: string;
  desc_en: string;
  name_ar: string;
  desc_ar: string;
  sort_order?: number;
};

const CATS: Category[] = ["surface", "laundry", "dish", "care"];

/** Turns a database row into the shape the storefront components expect. */
export function rowToProduct(row: ProductRow): Product {
  const seed = row.seed_key ?? row.id;
  const url = row.image_url?.trim();
  return {
    id: row.id,
    image: url || SEED_IMAGES[seed] || SEED_IMAGES["p1"]!,
    price: Number(row.price) || 0,
    size: row.size ?? "",
    category: (CATS.includes(row.category as Category) ? row.category : "surface") as Category,
    color: row.color || "#2C4A9E",
    panel: row.panel || "#4B7FC4",
    en: { name: row.name_en, desc: row.desc_en },
    ar: { name: row.name_ar || row.name_en, desc: row.desc_ar || row.desc_en },
  };
}
