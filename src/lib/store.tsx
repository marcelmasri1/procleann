import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "@/data/products";

/* ---------------- language ---------------- */

export type Lang = "en" | "ar";

const COPY = {
  tagline: { en: "PROFESSIONAL CLEAN", ar: "نظافة احترافية" },
  heroKicker: { en: "PROCLEAN DETERGENTS", ar: "بروكلين للمنظفات" },
  heroBlurb: {
    en: "Household detergents built for real Lebanese homes — surfaces, laundry, dishes and hands.",
    ar: "منظفات منزلية مصنوعة للمنازل الحقيقية — الأسطح والغسيل والأطباق واليدين.",
  },
  discover: { en: "DISCOVER IT", ar: "تسوّق الآن" },
  catalog: { en: "THE CATALOG", ar: "المنتجات" },
  catalogBlurb: {
    en: "Many formulas. One standard of clean.",
    ar: "تركيبات عديدة. معيار واحد للنظافة.",
  },
  add: { en: "Add to cart", ar: "أضف إلى السلة" },
  added: { en: "Added", ar: "تمت الإضافة" },
  cart: { en: "Shopping list", ar: "قائمة الشراء" },
  empty: { en: "Your list is empty.", ar: "قائمتك فارغة." },
  total: { en: "Total", ar: "المجموع" },
  clear: { en: "Clear list", ar: "إفراغ القائمة" },
  waCheckout: { en: "Checkout via WhatsApp", ar: "إتمام الطلب عبر واتساب" },
  saveOrder: { en: "Place order", ar: "إرسال الطلب" },
  name: { en: "Full name", ar: "الاسم الكامل" },
  phone: { en: "Phone number", ar: "رقم الهاتف" },
  address: { en: "Address (optional)", ar: "العنوان (اختياري)" },
  note: { en: "Note (optional)", ar: "ملاحظة (اختياري)" },
  orderOk: { en: "Order received. We'll call you shortly.", ar: "تم استلام طلبك. سنتواصل معك قريباً." },
  orderFail: { en: "Could not send the order. Please try WhatsApp.", ar: "تعذّر إرسال الطلب. جرّب واتساب." },
  video: { en: "IN ACTION", ar: "شاهد المنتج" },
  follow: { en: "Follow ProClean", ar: "تابع بروكلين" },
  rights: { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
} as const;

export type CopyKey = keyof typeof COPY;

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: (k: CopyKey) => string };
const LangContext = createContext<LangCtx | null>(null);

/* ---------------- theme ---------------- */

type ThemeCtx = { dark: boolean; toggle: () => void };
const ThemeContext = createContext<ThemeCtx | null>(null);

/* ---------------- cart ---------------- */

export type CartLine = { id: string; qty: number };
type CartCtx = {
  lines: CartLine[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  detailed: { product: Product; qty: number }[];
};
const CartContext = createContext<CartCtx | null>(null);

export function AppProviders({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const l = localStorage.getItem("pc_lang");
    if (l === "ar" || l === "en") setLang(l);
    if (localStorage.getItem("pc_dark") === "1") setDark(true);
    const c = localStorage.getItem("pc_cart");
    if (c) {
      try {
        setLines(JSON.parse(c) as CartLine[]);
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("pc_lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("pc_dark", dark ? "1" : "0");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("pc_cart", JSON.stringify(lines));
  }, [lines]);

  const t = useCallback((k: CopyKey) => COPY[k][lang], [lang]);

  const add = useCallback((id: string) => {
    setLines((prev) => {
      const hit = prev.find((l) => l.id === id);
      return hit
        ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
        : [...prev, { id, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const detailed = useMemo(
    () =>
      lines
        .map((l) => {
          const product = PRODUCTS.find((p) => p.id === l.id);
          return product ? { product, qty: l.qty } : null;
        })
        .filter((v): v is { product: Product; qty: number } => v !== null),
    [lines],
  );

  const cart = useMemo<CartCtx>(
    () => ({
      lines,
      open,
      setOpen,
      add,
      setQty,
      clear: () => setLines([]),
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: detailed.reduce((s, l) => s + l.product.price * l.qty, 0),
      detailed,
    }),
    [lines, open, add, setQty, detailed],
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <ThemeContext.Provider value={{ dark, toggle: () => setDark((v) => !v) }}>
        <CartContext.Provider value={cart}>{children}</CartContext.Provider>
      </ThemeContext.Provider>
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside AppProviders");
  return ctx;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside AppProviders");
  return ctx;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside AppProviders");
  return ctx;
}

export const LINKS = {
  instagram: "https://www.instagram.com/proclean.detergents?igsi=MTBwbjlxNGwxbDZ4eQ==",
  facebook: "https://www.facebook.com/share/1bXsqCdGi1/",
  whatsapp: "https://wa.me/96179001163",
};

export function whatsappUrl(lines: { product: Product; qty: number }[], total: number, lang: Lang) {
  const head = "Hello ProClean! I would like more information or to place an order for my shopping cart.";
  const body = lines
    .map((l) => `• ${l.product[lang].name} (${l.product.size}) x${l.qty} — $${(l.product.price * l.qty).toFixed(2)}`)
    .join("\n");
  const text = lines.length ? `${head}\n\n${body}\n\nTotal: $${total.toFixed(2)}` : head;
  return `${LINKS.whatsapp}?text=${encodeURIComponent(text)}`;
}
