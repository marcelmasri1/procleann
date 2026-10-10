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
import p12 from "@/assets/products/p12.png";
import p13 from "@/assets/products/p13.png";
import p14 from "@/assets/products/p14.png";
import p15 from "@/assets/products/p15.png";
import p16 from "@/assets/products/p16.png";

export type Category = "surface" | "laundry" | "dish" | "care" | "offer";

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
    price: 360000,
    size: "4 L",
    category: "surface",
    color: "#1E7A66",
    panel: "#2F9C84",
    en: {
      name: "Floral Cleaner — Pine Fresh",
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
    price: 540000,
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
    price: 157500,
    size: "750 ml",
    category: "dish",
    color: "#12BCCB",
    panel: "#3FD3DE",
    en: {
      name: "Dishwash — Cool Mint",
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
    price: 157500,
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
    price: 180000,
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
    price: 270000,
    size: "4 L",
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
    price: 180000,
    size: "500 ml",
    category: "care",
    color: "#7FA9CC",
    panel: "#9CC0DD",
    en: {
      name: "Dove Anti-Bacterial Hand Soap",
      desc: "Gentle, moisturizing liquid hand gel designed to eliminate germs without drying out skin. Formulated with a soft, pleasant fragrance suitable for daily family use.",
    },
    ar: {
      name: "دوف — صابون يدين مضاد للبكتيريا",
      desc: "جل يدين سائل لطيف ومرطب، مصمم للقضاء على الجراثيم دون تجفيف البشرة. برائحة ناعمة ولطيفة تناسب الاستخدام اليومي لجميع أفراد العائلة.",
    },
  },
  {
    id: "p8",
    image: p8,
    price: 360000,
    size: "4 L",
    category: "surface",
    color: "#9A8FD0",
    panel: "#B6AEE0",
    en: {
      name: "Floral Cleaner — Lavender",
      desc: "Multi-surface home cleaner that provides a soft floral touch. Combines powerful surface cleaning with a soothing, long-lasting lavender fragrance.",
    },
    ar: {
      name: "منظف الأسطح — لافندر",
      desc: "منظف منزلي متعدد الأسطح بلمسة زهرية ناعمة، يجمع بين قوة التنظيف ورائحة اللافندر المهدئة التي تدوم طويلاً.",
    },
  },
  {
    id: "p9",
    image: p9,
    price: 360000,
    size: "4 L",
    category: "surface",
    color: "#F898E0",
    panel: "#F898E0",
    en: {
      name: "Floral Cleaner — Cammy",
      desc: "All-in-one floor and surface cleaner that removes dirt and grime while leaving rooms filled with a long-lasting, fresh blooming floral scent.",
    },
    ar: {
      name: "منظف الأسطح — كامي",
      desc: "منظف شامل للأرضيات والأسطح يزيل الأوساخ والأتربة، ويترك المنزل معطراً برائحة زهور منعشة تدوم طويلاً.",
    },
  },
  {
    id: "p10",
    image: p10,
    price: 360000,
    size: "4 L",
    category: "surface",
    color: "#2AA3C2",
    panel: "#4FBBD6",
    en: {
      name: "Floral Cleaner — Ocean Breeze",
      desc: "Multi-surface floor and home cleaner infused with a fresh ocean wave floral fragrance. Specially formulated to remove dirt and daily grime while keeping your home smelling clean and invigorated all day long.",
    },
    ar: {
      name: "منظف الأسطح — نسيم المحيط",
      desc: "منظف متعدد الأسطح للأرضيات والمنزل، بعبق زهري منعش يشبه أمواج المحيط. تركيبة خاصة لإزالة الأوساخ اليومية مع الحفاظ على انتعاش المنزل طوال اليوم.",
    },
  },
  {
    id: "p11",
    image: p11,
    price: 450000,
    size: "4 L",
    category: "dish",
    color: "#1C97A8",
    panel: "#37B4C4",
    en: {
      name: "Dishwash — Cool Mint",
      desc: "Heavy-duty liquid dishwashing detergent infused with a crisp cool mint scent. Effortlessly cuts through stubborn grease and dried food particles, leaving cookware sparkling clean.",
    },
    ar: {
      name: "غسيل الأطباق — النعناع المنعش",
      desc: "منظف أطباق فائق القوة برائحة النعناع المنعشة، يزيل الدهون العنيدة وبقايا الطعام الجاف بسهولة، تاركاً الأواني نظيفة ولامعة.",
    },
  },
  {
    id: "p12",
    image: p12,
    price: 450000,
    size: "4 L",
    category: "dish",
    color: "#D6B83F",
    panel: "#E8D36C",
    en: {
      name: "Dishwash — Lemon",
      desc: "Gentle yet powerful liquid dishwashing detergent infused with a refreshing lemon scent. Formulated to be soft on hands while deeply cleaning, sanitizing, and cutting through tough grease to leave your dishes sparkling clean.",
    },
    ar: {
      name: "غسيل الأطباق — ليمون",
      desc: "سائل جلي يدوي فعّال برائحة الليمون المنعشة، مصمم ليكون لطيفاً على اليدين بينما ينظف ويعقم بعمق. يقضي على الدهون والصعوبات بسهولة، ليعيد لأطباقك وأوانيك لمعانها ونظافتها الفائقة.",
    },
  },
  {
    id: "p13",
    image: p13,
    price: 180000,
    size: "500 ml",
    category: "care",
    color: "#D07870",
    panel: "#E2B6B1",
    en: {
      name: "Anti-Bacterial Hand Gel — Oud Scent",
      desc: "Gentle, antibacterial liquid hand gel designed to effectively eliminate germs while keeping skin hydrated. Infused with a rich, oriental Oud fragrance that delivers a warm, luxurious wash for daily family use.",
    },
    ar: {
      name: "جل اليدين المضاد للبكتيريا — عطر العود",
      desc: "جل سائل لليدين مقاوم للبكتيريا ينظف بلطف ويقضي على الجراثيم دون أن يسبب جفاف البشرة. ميز بعبير العود الشرقي الفاخر ليمنحك إحساساً بالأناقة والنظافة العميقة للاستخدام اليومي لكافة أفراد العائلة.",
    },
  },
  {
    id: "p14",
    image: p14,
    price: 180000,
    size: "500 ml",
    category: "care",
    color: "#F0B8D8",
    panel: "#F8C6E4",
    en: {
      name: "Anti-Bacterial Hand Gel — Bubble Gum",
      desc: "Gentle, antibacterial liquid hand gel designed to effectively eliminate germs while keeping skin soft and moisturized. Formulated with a sweet, playful Bubble fragrance that makes hand hygiene delightful for the whole family.",
    },
    ar: {
      name: "جل اليدين المضاد للبكتيريا — عطر البابل",
      desc: "جل سائل لليدين مقاوم للبكتيريا يقضي على الجراثيم ويوفر ترطيباً لطيفاً لحماية يديك من الجفاف. يتميز برائحة العلكة (البابل) المنعشة والممتعة، مما يجعله خياراً مثالياً ومحبباً للاستخدام اليومي لجميع أفراد العائلة.",
    },
  },
  {
    id: "p15",
    image: p15,
    price: 180000,
    size: "500 ml",
    category: "care",
    color: "#D8D070",
    panel: "#E8DF66",
    en: {
      name: "Anti-Bacterial Hand Gel — Lemon Scent",
      desc: "Gentle, antibacterial liquid hand gel designed to eliminate germs without drying out the skin. Infused with a crisp, refreshing Lemon fragrance that leaves hands feeling invigorated, clean, and beautifully scented every day.",
    },
    ar: {
      name: "جل اليدين المضاد للبكتيريا — عطر الليمون",
      desc: "جل سائل لليدين مقاوم للبكتيريا يعمل على إزالة الجراثيم بفعالية مع الحفاظ على ترطيب ونعومة البشرة. بعبير الليمون المنعش الذي يمنح يديك إحساساً فورياً بالحيوية والنظافة التامة للاستخدام العائلي اليومي.",
    },
  },
  {
    id: "p16",
    image: p16,
    price: 1800000,
    size: "5 products",
    category: "offer",
    color: "#B88B58",
    panel: "#D5AD79",
    en: {
      name: "ProClean Complete Home Box",
      desc: "A complete five-product home cleaning selection with laundry, antiseptic, floral, bleach, and dishwashing essentials.",
    },
    ar: {
      name: "بوكس بروكلين المتكامل للمنزل",
      desc: "تشكيلة منزلية متكاملة من خمسة منتجات أساسية للغسيل والتطهير وتنظيف الأسطح والتبييض وغسيل الأطباق.",
    },
  },
];

export const CATEGORIES: { id: "all" | Category; en: string; ar: string }[] = [
  { id: "all", en: "All products", ar: "كل المنتجات" },
  { id: "surface", en: "Surface & floors", ar: "الأسطح والأرضيات" },
  { id: "laundry", en: "Laundry", ar: "الغسيل" },
  { id: "dish", en: "Dishwashing", ar: "غسيل الأطباق" },
  { id: "care", en: "Hand care", ar: "العناية باليدين" },
  { id: "offer", en: "Offers", ar: "العروض" },
];
