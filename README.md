# ProClean 

Build a high-performance, responsive e-commerce application for "ProClean Detergents" using React, TypeScript, Vite, Tailwind CSS, lucide-react, and Supabase backend with strict RLS and zero hardcoded client-side API keys. Global Setup & Head Imports: Add the Google Fonts to index.html: ```html <link rel="preconnect" href="[https://fonts.googleapis.com](https://fonts.googleapis.com)" /> <link rel="preconnect" href="[https://fonts.gstatic.com](https://fonts.gstatic.com)" crossorigin /> <link href="[https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap](https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap)" rel="stylesheet" /> Set global body font to 'Inter', sans-serif and display text to 'Anton', sans-serif. Hero Section ("TOONHUB" 3D Carousel Component):

Full viewport height (100vh), relative layout with continuous CSS background transition (650ms cubic-bezier(0.4,0,0.2,1)) matching active image item.

Preload image dataset on mount:const IMAGES = [ { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png', bg: '#F4845F', panel: '#F79B7F' }, { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png', bg: '#6BBF7A', panel: '#85CC92' }, { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png', bg: '#E882B4', panel: '#ED9DC4' }, { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png', bg: '#6EB5FF', panel: '#8DC4FF' }, ];

Implement visual layers:

Grain Overlay: Absolute overlay (zIndex 50) using SVG fractalNoise (baseFrequency=0.9, numOctaves=4, SVG opacity 0.08, container opacity 0.4, background size 200px 200px).

Giant Ghost Text: Absolute centered at top: 18% (zIndex 2), font 'Anton', text "3D SHAPE", fontSize: clamp(90px, 28vw, 380px), white opacity 1, letter spacing -0.02em.

Top-Left Brand Label: "PROCLEAN" (top-6 left-4 sm:left-8, zIndex 60, white, text-xs font-semibold, tracking 0.18em). Use the image from slot 1 (IMAGES[0].src) as the brand logo header icon.

Carousel Stack: Dynamic role positioning driven by activeIndex state with a 650ms animation lock (center=active, left=(active+3)%4, right=(active+1)%4, back=(active+2)%4).

Center: scale(1.68) (Mobile: 1.25), no blur, opacity 1, zIndex 20, left: 50%, height: 92% (Mobile: 60%).

Left: scale(1.0), blur(2px), opacity 0.85, zIndex 10, left: 30% (Mobile: 20%).

Right: scale(1.0), blur(2px), opacity 0.85, zIndex 10, left: 70% (Mobile: 80%).

Back: scale(1.0), blur(4px), opacity 1.0, zIndex 5, left: 50%.

Bottom Controls & Text: Bottom-left layout containing "TOONHUB FIGURINES" text, product description snippet, and circular ArrowLeft/ArrowRight buttons from lucide-react to cycle carousel items. Bottom-right "DISCOVER IT" CTA in 'Anton' font with ArrowRight icon scrolling smooth down to store catalog.

E-Commerce Catalog, Shopping List & Checkout System:

Display ProClean product catalog below hero with clean card design, pricing, category filters, and "Add to Cart" functionality.

Slide-out interactive shopping cart drawer tracking total price, quantity modifications, and itemized checkout list.

Secure order submission stored in Supabase tables.

Redirection & External Links:

Instagram Profile Link: https://www.instagram.com/proclean.detergents?igsi=MTBwbjlxNGwxbDZ4eQ==

Facebook Profile Link: https://www.facebook.com/share/1bXsqCdGi1/

WhatsApp Direct Order/Inquiry Integration: "Checkout via WhatsApp" action redirecting to https://wa.me/96179001163?text=Hello%20ProClean!%20I%20would%20like%20more%20information%20or%20to%20place%20an%20order%20for%20my%20shopping%20cart. (formatted dynamically with itemized cart list contents). logo is uploaded as image 1 Product 1 — Surface Cleaner (Pine Fresh)

EN: Deep-cleaning surface formula enriched with a crisp forest pine scent. Effectively cleans household surfaces while neutralizing unwanted odors.

AR: تركيبة تنظيف عميق للأسطح، غنية برائحة صنوبر الغابة المنعشة. تنظف أسطح المنزل بفعالية مع القضاء على الروائح غير المرغوب فيها.

Product 2 — All-in-One Laundry Liquid (3L)

EN: High-efficiency liquid laundry detergent formulated for maximum stain removal while protecting fabrics. Delivers a long-lasting, fresh scent designed to power through heavy family-sized laundry loads.

AR: منظف غسيل سائل عالي الفعالية، مصمم لإزالة أقوى البقع مع الحفاظ على الأقمشة. يمنح رائحة منعشة تدوم طويلاً، ومثالي لغسل كميات كبيرة من ملابس العائلة.

Product 3 — Dishwashing Liquid (Cool Mint, 750ml)

EN: Refreshing mint-scented dish detergent formulated to tackle tough grease on plates and cookware while remaining gentle and non-irritating on hands.

AR: سائل غسيل أطباق برائحة النعناع المنعشة، مصمم لإزالة أصعب بقع الدهون عن الأطباق وأواني الطهي، مع الحفاظ على نعومة اليدين دون تهيج.

Product 4 — Dishwash (Lemon, 750ml)

EN: Classic citrus-powered dishwashing detergent designed for fast grease elimination, high-foaming action, and a spot-free, gleaming finish.

AR: منظف أطباق كلاسيكي بقوة الليمون، مصمم لإزالة الدهون بسرعة، مع رغوة غزيرة ولمعان خالٍ من البقع.

Product 5 — 2-in-1 Antiseptic & Disinfectant Cleaner (500ml)

EN: Dual-action floor and surface cleaner engineered to kill bacteria and disinfect thoroughly while leaving behind a high-gloss, streak-free shine across all hard surfaces.

AR: منظف مزدوج المفعول للأرضيات والأسطح، مصمم للقضاء على البكتيريا والتطهير الشامل، مع ترك لمعان قوي وخالٍ من الخطوط على جميع الأسطح الصلبة.

Product 6 — Heavy-Duty Bleach

EN: Concentrated whitening and sanitizing solution built to remove deep stains, brighten white laundry, and disinfect bathroom and kitchen surfaces.

AR: محلول مركّز للتبييض والتعقيم، مصمم لإزالة البقع العميقة، وتبييض الملابس البيضاء، وتطهير أسطح الحمام والمطبخ.

Product 7 — Anti-Bacterial Liquid Hand Soap

EN: Gentle, moisturizing liquid hand gel designed to eliminate germs without drying out skin. Formulated with a soft, pleasant fragrance suitable for daily family use.

AR: جل يدين سائل لطيف ومرطب، مصمم للقضاء على الجراثيم دون تجفيف البشرة. برائحة ناعمة ولطيفة تناسب الاستخدام اليومي لجميع أفراد العائلة.

Product 8 — Floral Cleaner (Purple)

EN: Multi-surface home cleaner that provides a soft floral touch. Combines powerful surface cleaning with a soothing, long-lasting lavender fragrance.

AR: منظف منزلي متعدد الأسطح بلمسة زهرية ناعمة، يجمع بين قوة التنظيف ورائحة اللافندر المهدئة التي تدوم طويلاً.

Product 9 — Floral Cleaner (Pink)

EN: All-in-one floor and surface cleaner that removes dirt and grime while leaving rooms filled with a long-lasting, fresh blooming floral scent.

AR: منظف شامل للأرضيات والأسطح يزيل الأوساخ والأتربة، ويترك المنزل معطراً برائحة زهور منعشة تدوم طويلاً.

Product 10 — Floral Cleaner (Blue)

EN: Multi-surface floor and home cleaner infused with a fresh ocean wave floral fragrance. Specially formulated to remove dirt and daily grime while keeping your home smelling clean and invigorated all day long.

AR: منظف متعدد الأسطح للأرضيات والمنزل، بعبق زهري منعش يشبه أمواج المحيط. تركيبة خاصة لإزالة الأوساخ اليومية مع الحفاظ على انتعاش المنزل طوال اليوم.

Product 11 — Dishwash (Ocean Splash)

EN: Heavy-duty liquid dishwashing detergent infused with a crisp ocean breeze scent. Effortlessly cuts through stubborn grease and dried food particles, leaving cookware sparkling clean.

AR: منظف أطباق فائق القوة برائحة نسيم المحيط المنعشة، يزيل الدهون العنيدة وبقايا الطعام الجاف بسهولة، تاركاً الأواني نظيفة ولامعة. also create the website with a button light and dark mode and one for arabic and english mode
i need some adjustments first the layout make them 2 in each row also i send the products as a whole image you can crop all ad only show the bottle or gallon without the images background or if its not possible add an invisible background or plain white for the products also match the colors and like the yellow bottle is yellow background vice versa. also add the short video that i uploaded in a way but just as a video not as a instagram reel   also i cant stress this enough make the product collor match exactly the background collor as i swipe https://www.instagram.com/reel/Dcoa0kTi6_j/?igsi=MWRhdzJhbzhja3hxdA==

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://procleann.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d49aa56e-6cae-4b75-966b-6755ee906a44).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
