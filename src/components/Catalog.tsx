import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES, type Category } from "@/data/products";
import { useCart, useCurrency, useLang, useProducts } from "@/lib/store";
import { Button } from "@/components/ui/button";

export default function Catalog() {
  const { lang, t } = useLang();
  const { add, setOpen } = useCart();
  const { formatPrice } = useCurrency();
  const products = useProducts();
  const [filter, setFilter] = useState<"all" | Category>("all");

  const shown = [...(filter === "all" ? products : products.filter((p) => p.category === filter))].sort(
    (a, b) => Number(b.category === "offer") - Number(a.category === "offer"),
  );

  const offerContents =
    lang === "ar"
      ? [
          "منظف الغسيل الشامل 3 لتر",
          "منظف ومطهر 2 في 1 سعة 500 مل",
          "منظف بروكلين الزهري متعدد الأسطح 4 لتر",
          "مبيض بروكلين قوي المفعول 4 لتر",
          "سائل بروكلين لغسيل الأطباق 4 لتر",
        ]
      : [
          "3 L All-in-One Laundry Liquid",
          "500 ml 2-in-1 Antiseptic & Disinfectant Cleaner",
          "4 L ProClean Floral Multi-Surface Cleaner",
          "4 L ProClean Heavy-Duty Bleach",
          "4 L ProClean Dishwashing Liquid",
        ];

  return (
    <section id="catalog" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="font-display text-4xl text-foreground sm:text-6xl">{t("catalog")}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("catalogBlurb")}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <Button
            key={c.id}
            type="button"
            variant={filter === c.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(c.id)}
            className="rounded-full px-4"
          >
            {c[lang]}
          </Button>
        ))}
      </div>

      {/* two products per row on every screen size */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
        {shown.map((p) => (
          <article
            key={p.id}
            id={`product-${p.id}`}
            className={`flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-shadow scroll-mt-24 ${
              p.category === "offer" ? "border-primary col-span-2 sm:grid sm:grid-cols-2" : "border-border"
            }`}
          >
            <div
              className={`relative aspect-square w-full ${p.category === "offer" ? "sm:aspect-auto sm:min-h-[30rem]" : ""}`}
              style={{
                background: p.category === "offer" ? "#FFFFFF" : `linear-gradient(160deg, ${p.panel} 0%, ${p.color} 100%)`,
              }}
            >
              {p.category === "offer" ? (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-destructive px-3 py-1 text-xs font-bold uppercase text-destructive-foreground">
                  {lang === "ar" ? "عرض خاص" : "Special offer"}
                </span>
              ) : null}
              <img
                src={p.image}
                alt={p[lang].name}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-contain drop-shadow-xl ${p.category === "offer" ? "p-2 sm:p-6" : "p-4"}`}
              />
            </div>

            <div className={`flex min-w-0 flex-1 flex-col p-4 ${p.category === "offer" ? "justify-center sm:p-10" : ""}`}>
              {p.category === "offer" ? (
                <p className="mb-2 text-xs font-bold uppercase text-primary">
                  {lang === "ar" ? "عرض التوفير المنزلي" : "Home value offer"}
                </p>
              ) : null}
              <h3 className={`font-semibold text-card-foreground ${p.category === "offer" ? "text-2xl sm:text-4xl" : "text-sm sm:text-base"}`}>
                {p[lang].name}
              </h3>
              {p.category === "offer" ? (
                <>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{p[lang].desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {offerContents.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-card-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <p className="mt-1 text-xs text-muted-foreground">{p.size}</p>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{p[lang].desc}</p>
                </>
              )}
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="font-display text-xl text-foreground">{formatPrice(p.price)}</span>
                <Button
                  type="button"
                  onClick={() => {
                    add(p.id);
                    toast.success(`${t("added")}: ${p[lang].name}`);
                    setOpen(true);
                  }}
                  size="sm"
                  className="shrink-0 rounded-full px-3"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("add")}</span>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
