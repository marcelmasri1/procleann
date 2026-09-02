import { useEffect, useState } from "react";
import { ImageOff, Plus } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES, PRODUCTS, type Category } from "@/data/products";
import { FOCUS_EVENT, useCart, useLang } from "@/lib/store";

function ProductImage({ src, alt, failLabel }: { src: string; alt: string; failLabel: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 grid place-items-center gap-1 p-4 text-center text-white/90">
        <ImageOff className="h-6 w-6" />
        <span className="text-[10px] font-medium">{failLabel}</span>
      </div>
    );
  }

  return (
    <>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-white/20" aria-hidden />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`absolute inset-0 h-full w-full object-contain p-4 drop-shadow-xl transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

export default function Catalog() {
  const { lang, t } = useLang();
  const { add, setOpen } = useCart();
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [highlight, setHighlight] = useState<string | null>(null);

  // hero bottle click → reveal, scroll to and highlight the matching card
  useEffect(() => {
    const onFocus = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setFilter("all");
      setHighlight(id);
      window.setTimeout(() => {
        document.getElementById(`product-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 60);
      window.setTimeout(() => setHighlight((h) => (h === id ? null : h)), 2600);
    };
    window.addEventListener(FOCUS_EVENT, onFocus);
    return () => window.removeEventListener(FOCUS_EVENT, onFocus);
  }, []);

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
            id={`product-${p.id}`}
            className={`flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-all duration-500 ${
              highlight === p.id
                ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "border-border"
            }`}
          >
            <div
              className="relative aspect-square w-full"
              style={{ background: `linear-gradient(160deg, ${p.panel} 0%, ${p.color} 100%)` }}
            >
              <ProductImage src={p.image} alt={p[lang].name} failLabel={t("imgFail")} />
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
                    toast.success(`${p[lang].name} — ${t("addedToast")}`);
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
