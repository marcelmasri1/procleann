-- Products table backing the storefront + admin panel.
-- Public (anon) can only ever SELECT. All writes go through the
-- service-role admin server functions, which check the admin password
-- before touching this table, so no anon/authenticated write policies
-- are defined here at all.
CREATE TABLE public.products (
  id text NOT NULL PRIMARY KEY,
  seed_key text,
  image_url text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  size text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'surface',
  color text NOT NULL DEFAULT '#2C4A9E',
  panel text NOT NULL DEFAULT '#4B7FC4',
  name_en text NOT NULL DEFAULT '',
  desc_en text NOT NULL DEFAULT '',
  name_ar text NOT NULL DEFAULT '',
  desc_ar text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT TO anon, authenticated USING (true);

-- seed_key links a row back to its bundled Vite image
-- (src/assets/products/p1.png etc.) for the original catalog.
-- New admin-added products leave seed_key null and use image_url instead.
INSERT INTO public.products
  (id, seed_key, price, size, category, color, panel, name_en, desc_en, name_ar, desc_ar, sort_order)
VALUES
  ('p1', 'p1', 4.5, '3 L', 'surface', '#1E7A66', '#2F9C84',
   'Surface Cleaner — Pine Fresh',
   'Deep-cleaning surface formula enriched with a crisp forest pine scent. Effectively cleans household surfaces while neutralizing unwanted odors.',
   'منظف الأسطح — الصنوبر',
   'تركيبة تنظيف عميق للأسطح، غنية برائحة صنوبر الغابة المنعشة. تنظف أسطح المنزل بفعالية مع القضاء على الروائح غير المرغوب فيها.',
   1),
  ('p2', 'p2', 6.9, '3 L', 'laundry', '#0E9AA0', '#1FBAC0',
   'All-in-One Laundry Liquid',
   'High-efficiency liquid laundry detergent formulated for maximum stain removal while protecting fabrics. Delivers a long-lasting, fresh scent designed to power through heavy family-sized laundry loads.',
   'منظف الغسيل الشامل',
   'منظف غسيل سائل عالي الفعالية، مصمم لإزالة أقوى البقع مع الحفاظ على الأقمشة. يمنح رائحة منعشة تدوم طويلاً، ومثالي لغسل كميات كبيرة من ملابس العائلة.',
   2),
  ('p3', 'p3', 2.4, '750 ml', 'dish', '#12BCCB', '#3FD3DE',
   'Dishwashing Liquid — Cool Mint',
   'Refreshing mint-scented dish detergent formulated to tackle tough grease on plates and cookware while remaining gentle and non-irritating on hands.',
   'غسيل الأطباق — نعناع',
   'سائل غسيل أطباق برائحة النعناع المنعشة، مصمم لإزالة أصعب بقع الدهون عن الأطباق وأواني الطهي، مع الحفاظ على نعومة اليدين دون تهيج.',
   3),
  ('p4', 'p4', 2.4, '750 ml', 'dish', '#C9BE18', '#E0D63A',
   'Dishwash — Lemon',
   'Classic citrus-powered dishwashing detergent designed for fast grease elimination, high-foaming action, and a spot-free, gleaming finish.',
   'غسيل الأطباق — ليمون',
   'منظف أطباق كلاسيكي بقوة الليمون، مصمم لإزالة الدهون بسرعة، مع رغوة غزيرة ولمعان خالٍ من البقع.',
   4),
  ('p5', 'p5', 3.2, '500 ml', 'surface', '#A9481C', '#C7602F',
   '2-in-1 Antiseptic & Disinfectant Cleaner',
   'Dual-action floor and surface cleaner engineered to kill bacteria and disinfect thoroughly while leaving behind a high-gloss, streak-free shine across all hard surfaces.',
   'منظف ومطهر 2 في 1',
   'منظف مزدوج المفعول للأرضيات والأسطح، مصمم للقضاء على البكتيريا والتطهير الشامل، مع ترك لمعان قوي وخالٍ من الخطوط على جميع الأسطح الصلبة.',
   5),
  ('p6', 'p6', 3.5, '3 L', 'laundry', '#2C5EA6', '#4B7FC4',
   'Heavy-Duty Bleach',
   'Concentrated whitening and sanitizing solution built to remove deep stains, brighten white laundry, and disinfect bathroom and kitchen surfaces.',
   'مبيض قوي المفعول',
   'محلول مركّز للتبييض والتعقيم، مصمم لإزالة البقع العميقة، وتبييض الملابس البيضاء، وتطهير أسطح الحمام والمطبخ.',
   6),
  ('p7', 'p7', 2.9, '500 ml', 'care', '#7FA9CC', '#9CC0DD',
   'Dove Anti-Bacterial Hand Soap',
   'Gentle, moisturizing liquid hand gel designed to eliminate germs without drying out skin. Formulated with a soft, pleasant fragrance suitable for daily family use.',
   'دوف — صابون يدين مضاد للبكتيريا',
   'جل يدين سائل لطيف ومرطب، مصمم للقضاء على الجراثيم دون تجفيف البشرة. برائحة ناعمة ولطيفة تناسب الاستخدام اليومي لجميع أفراد العائلة.',
   7),
  ('p8', 'p8', 5.5, '3 L', 'surface', '#8558B8', '#A278CF',
   'Floral Cleaner — Lavender',
   'Multi-surface home cleaner that provides a soft floral touch. Combines powerful surface cleaning with a soothing, long-lasting lavender fragrance.',
   'منظف الأزهار — لافندر',
   'منظف منزلي متعدد الأسطح بلمسة زهرية ناعمة، يجمع بين قوة التنظيف ورائحة اللافندر المهدئة التي تدوم طويلاً.',
   8),
  ('p9', 'p9', 5.5, '3 L', 'surface', '#DC3E77', '#EC6394',
   'Floral Cleaner — Cammy',
   'All-in-one floor and surface cleaner that removes dirt and grime while leaving rooms filled with a long-lasting, fresh blooming floral scent.',
   'منظف الأزهار — كامي',
   'منظف شامل للأرضيات والأسطح يزيل الأوساخ والأتربة، ويترك المنزل معطراً برائحة زهور منعشة تدوم طويلاً.',
   9),
  ('p10', 'p10', 5.5, '3 L', 'surface', '#2AA3C2', '#4FBBD6',
   'Floral Cleaner — Ocean Breeze',
   'Multi-surface floor and home cleaner infused with a fresh ocean wave floral fragrance. Specially formulated to remove dirt and daily grime while keeping your home smelling clean and invigorated all day long.',
   'منظف الأزهار — نسيم المحيط',
   'منظف متعدد الأسطح للأرضيات والمنزل، بعبق زهري منعش يشبه أمواج المحيط. تركيبة خاصة لإزالة الأوساخ اليومية مع الحفاظ على انتعاش المنزل طوال اليوم.',
   10),
  ('p11', 'p11', 4.9, '3 L', 'dish', '#1C97A8', '#37B4C4',
   'Dishwash — Ocean Splash',
   'Heavy-duty liquid dishwashing detergent infused with a crisp ocean breeze scent. Effortlessly cuts through stubborn grease and dried food particles, leaving cookware sparkling clean.',
   'غسيل الأطباق — نسيم المحيط',
   'منظف أطباق فائق القوة برائحة نسيم المحيط المنعشة، يزيل الدهون العنيدة وبقايا الطعام الجاف بسهولة، تاركاً الأواني نظيفة ولامعة.',
   11);
