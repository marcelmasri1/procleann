import { useState } from "react";
import { Plus } from "lucide-react";
import { CATEGORIES, PRODUCTS, type Category } from "@/data/products";
import { useCart, useLang } from "@/lib/store";

export default function Catalog() {
  const { lang, t } = useLang();
  const { add, setOpen } = useCart();
  const [filter, setFilter] = useState<"all" | Category>("all");

  const shown = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <section id="catalog" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="font-display text-4xl text-foreground sm:text-6xl">{t("catalog")}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("catalogBlurb")}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              filter === c.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {c[lang]}
          </button>
        ))}
      </div>

      {/* two products per row on every screen size */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
        {shown.map((p) => (
          <article
            key={p.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
          >
            <div
              className="grid aspect-square place-items-center p-4"
              style={{ background: `linear-gradient(160deg, ${p.panel} 0%, ${p.color} 100%)` }}
            >
              <img
                src={p.image}
                alt={p[lang].name}
                loading="lazy"
                className="h-full w-auto object-contain drop-shadow-xl"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col p-4">
              <h3 className="text-sm font-semibold text-card-foreground sm:text-base">{p[lang].name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.size}</p>
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{p[lang].desc}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="font-display text-xl text-foreground">${p.price.toFixed(2)}</span>
                <button
                  onClick={() => {
                    add(p.id);
                    setOpen(true);
                  }}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("add")}</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
