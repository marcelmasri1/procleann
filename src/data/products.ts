import p1 from "@/assets/products/p1.png";
import p2 from "@/assets/products/p2.png";
import p3 from "@/assets/products/p3.png";
import p4 from "@/assets/products/p4.png";
import p5 from "@/assets/products/p5.png";
import p6 from "@/assets/products/p6.png";
import p7 from "@/assets/products/p7.png";
import p8 from "@/assets/products/p8.png";
import p9 from "@/assets/products/p9.png";
import p10 from "@/assets/products/p10.png";
import p11 from "@/assets/products/p11.png";

export type Category = "surface" | "laundry" | "dish" | "care";

export type Product = {
  id: string;
  image: string;
  price: number;
  size: string;
  category: Category;
  /** Exact bottle colour — drives the hero backdrop while swiping. */
  color: string;
  /** Slightly lighter shade of the same hue for the hero panel. */
  panel: string;
  en: { name: string; desc: string };
  ar: { name: string; desc: string };
};

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    image: p1,
    price: 4.5,
    size: "3 L",
    category: "surface",
    color: "#1E7A66",
    panel: "#2F9C84",
    en: {
      name: "Surface Cleaner — Pine Fresh",
      desc: "Deep-cleaning surface formula enriched with a crisp forest pine scent. Effectively cleans household surfaces while neutralizing unwanted odors.",
    },
    ar: {
      name: "منظف الأسطح — الصنوبر",
      desc: "تركيبة تنظيف عميق للأسطح، غنية برائحة صنوبر الغابة المنعشة. تنظف أسطح المنزل بفعالية مع القضاء على الروائح غير المرغوب فيها.",
    },
  },
  {
    id: "p2",
    image: p2,
    price: 6.9,
    size: "3 L",
    category: "laundry",
    color: "#0E9AA0",
    panel: "#1FBAC0",
    en: {
      name: "All-in-One Laundry Liquid",
      desc: "High-efficiency liquid laundry detergent formulated for maximum stain removal while protecting fabrics. Delivers a long-lasting, fresh scent designed to power through heavy family-sized laundry loads.",
    },
    ar: {
      name: "منظف الغسيل الشامل",
      desc: "منظف غسيل سائل عالي الفعالية، مصمم لإزالة أقوى البقع مع الحفاظ على الأقمشة. يمنح رائحة منعشة تدوم طويلاً، ومثالي لغسل كميات كبيرة من ملابس العائلة.",
    },
  },
  {
    id: "p3",
    image: p3,
    price: 2.4,
    size: "750 ml",
    category: "dish",
    color: "#12BCCB",
    panel: "#3FD3DE",
    en: {
      name: "Dishwashing Liquid — Cool Mint",
      desc: "Refreshing mint-scented dish detergent formulated to tackle tough grease on plates and cookware while remaining gentle and non-irritating on hands.",
    },
    ar: {
      name: "غسيل الأطباق — نعناع",
      desc: "سائل غسيل أطباق برائحة النعناع المنعشة، مصمم لإزالة أصعب بقع الدهون عن الأطباق وأواني الطهي، مع الحفاظ على نعومة اليدين دون تهيج.",
    },
  },
  {
    id: "p4",
    image: p4,
    price: 2.4,
    size: "750 ml",
    category: "dish",
    color: "#C9BE18",
    panel: "#E0D63A",
    en: {
      name: "Dishwash — Lemon",
      desc: "Classic citrus-powered dishwashing detergent designed for fast grease elimination, high-foaming action, and a spot-free, gleaming finish.",
    },
    ar: {
      name: "غسيل الأطباق — ليمون",
      desc: "منظف أطباق كلاسيكي بقوة الليمون، مصمم لإزالة الدهون بسرعة، مع رغوة غزيرة ولمعان خالٍ من البقع.",
    },
  },
  {
    id: "p5",
    image: p5,
    price: 3.2,
    size: "500 ml",
    category: "surface",
    color: "#A9481C",
    panel: "#C7602F",
    en: {
      name: "2-in-1 Antiseptic & Disinfectant Cleaner",
      desc: "Dual-action floor and surface cleaner engineered to kill bacteria and disinfect thoroughly while leaving behind a high-gloss, streak-free shine across all hard surfaces.",
    },
    ar: {
      name: "منظف ومطهر 2 في 1",
      desc: "منظف مزدوج المفعول للأرضيات والأسطح، مصمم للقضاء على البكتيريا والتطهير الشامل، مع ترك لمعان قوي وخالٍ من الخطوط على جميع الأسطح الصلبة.",
    },
  },
  {
    id: "p6",
    image: p6,
    price: 3.5,
    size: "3 L",
    category: "laundry",
    color: "#2C5EA6",
    panel: "#4B7FC4",
    en: {
      name: "Heavy-Duty Bleach",
      desc: "Concentrated whitening and sanitizing solution built to remove deep stains, brighten white laundry, and disinfect bathroom and kitchen surfaces.",
    },
    ar: {
      name: "مبيض قوي المفعول",
      desc: "محلول مركّز للتبييض والتعقيم، مصمم لإزالة البقع العميقة، وتبييض الملابس البيضاء، وتطهير أسطح الحمام والمطبخ.",
    },
  },
  {
    id: "p7",
    image: p7,
    price: 2.9,
    size: "500 ml",
    category: "care",
    color: "#7FA9CC",
    panel: "#9CC0DD",
    en: {
      name: "Anti-Bacterial Liquid Hand Soap",
      desc: "Gentle, moisturizing liquid hand gel designed to eliminate germs without drying out skin. Formulated with a soft, pleasant fragrance suitable for daily family use.",
    },
    ar: {
      name: "صابون يدين سائل مضاد للبكتيريا",
      desc: "جل يدين سائل لطيف ومرطب، مصمم للقضاء على الجراثيم دون تجفيف البشرة. برائحة ناعمة ولطيفة تناسب الاستخدام اليومي لجميع أفراد العائلة.",
    },
  },
  {
    id: "p8",
    image: p8,
    price: 5.5,
    size: "3 L",
    category: "surface",
    color: "#8558B8",
    panel: "#A278CF",
    en: {
      name: "Floral Cleaner — Purple",
      desc: "Multi-surface home cleaner that provides a soft floral touch. Combines powerful surface cleaning with a soothing, long-lasting lavender fragrance.",
    },
    ar: {
      name: "منظف الأزهار — بنفسجي",
      desc: "منظف منزلي متعدد الأسطح بلمسة زهرية ناعمة، يجمع بين قوة التنظيف ورائحة اللافندر المهدئة التي تدوم طويلاً.",
    },
  },
  {
    id: "p9",
    image: p9,
    price: 5.5,
    size: "3 L",
    category: "surface",
    color: "#DC3E77",
    panel: "#EC6394",
    en: {
      name: "Floral Cleaner — Pink",
      desc: "All-in-one floor and surface cleaner that removes dirt and grime while leaving rooms filled with a long-lasting, fresh blooming floral scent.",
    },
    ar: {
      name: "منظف الأزهار — وردي",
      desc: "منظف شامل للأرضيات والأسطح يزيل الأوساخ والأتربة، ويترك المنزل معطراً برائحة زهور منعشة تدوم طويلاً.",
    },
  },
  {
    id: "p10",
    image: p10,
    price: 5.5,
    size: "3 L",
    category: "surface",
    color: "#2AA3C2",
    panel: "#4FBBD6",
    en: {
      name: "Floral Cleaner — Blue",
      desc: "Multi-surface floor and home cleaner infused with a fresh ocean wave floral fragrance. Specially formulated to remove dirt and daily grime while keeping your home smelling clean and invigorated all day long.",
    },
    ar: {
      name: "منظف الأزهار — أزرق",
      desc: "منظف متعدد الأسطح للأرضيات والمنزل، بعبق زهري منعش يشبه أمواج المحيط. تركيبة خاصة لإزالة الأوساخ اليومية مع الحفاظ على انتعاش المنزل طوال اليوم.",
    },
  },
  {
    id: "p11",
    image: p11,
    price: 4.9,
    size: "3 L",
    category: "dish",
    color: "#1C97A8",
    panel: "#37B4C4",
    en: {
      name: "Dishwash — Ocean Splash",
      desc: "Heavy-duty liquid dishwashing detergent infused with a crisp ocean breeze scent. Effortlessly cuts through stubborn grease and dried food particles, leaving cookware sparkling clean.",
    },
    ar: {
      name: "غسيل الأطباق — نسيم المحيط",
      desc: "منظف أطباق فائق القوة برائحة نسيم المحيط المنعشة، يزيل الدهون العنيدة وبقايا الطعام الجاف بسهولة، تاركاً الأواني نظيفة ولامعة.",
    },
  },
];

export const CATEGORIES: { id: "all" | Category; en: string; ar: string }[] = [
  { id: "all", en: "All products", ar: "كل المنتجات" },
  { id: "surface", en: "Surface & floors", ar: "الأسطح والأرضيات" },
  { id: "laundry", en: "Laundry", ar: "الغسيل" },
  { id: "dish", en: "Dishwashing", ar: "غسيل الأطباق" },
  { id: "care", en: "Hand care", ar: "العناية باليدين" },
];
