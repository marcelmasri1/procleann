import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useLang } from "@/lib/store";
import logo from "@/assets/proclean-logo.jpg.asset.json";

const EASE = "650ms cubic-bezier(0.4,0,0.2,1)";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")";

type Role = "center" | "left" | "right" | "back";

export default function Hero() {
  const { lang, t } = useLang();
  const n = PRODUCTS.length;
  const [active, setActive] = useState(0);
  const locked = useRef(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // preload every bottle so swiping never flashes
  useEffect(() => {
    PRODUCTS.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, []);

  const move = useCallback(
    (dir: 1 | -1) => {
      if (locked.current) return;
      locked.current = true;
      setActive((i) => (i + dir + n) % n);
      window.setTimeout(() => {
        locked.current = false;
      }, 650);
    },
    [n],
  );

  const roleOf = (i: number): Role | null => {
    if (i === active) return "center";
    if (i === (active + n - 1) % n) return "left";
    if (i === (active + 1) % n) return "right";
    if (i === (active + 2) % n) return "back";
    return null;
  };

  const styleFor = (role: Role) => {
    const base = {
      center: { scale: mobile ? 1.25 : 1.5, blur: 0, opacity: 1, z: 20, left: "50%", height: mobile ? "42%" : "55%" },
      left: { scale: 1, blur: 2, opacity: 0.85, z: 10, left: mobile ? "18%" : "28%", height: mobile ? "30%" : "40%" },
      right: { scale: 1, blur: 2, opacity: 0.85, z: 10, left: mobile ? "82%" : "72%", height: mobile ? "30%" : "40%" },
      back: { scale: 1, blur: 4, opacity: 1, z: 5, left: "50%", height: mobile ? "26%" : "34%" },
    }[role];

    return {
      left: base.left,
      height: base.height,
      zIndex: base.z,
      opacity: base.opacity,
      filter: base.blur ? `blur(${base.blur}px)` : "none",
      transform: `translate(-50%, -50%) scale(${base.scale})`,
      transition: `all ${EASE}`,
    } as const;
  };

  const current = PRODUCTS[active]!;

  return (
    <section
      className="relative h-[100vh] w-full overflow-hidden"
      style={{ backgroundColor: current.color, transition: `background-color ${EASE}` }}
      aria-label="ProClean hero"
    >
      {/* soft panel wash of the same hue */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 62%, ${current.panel} 0%, transparent 62%)`,
          transition: `background ${EASE}`,
          zIndex: 1,
        }}
      />

      {/* giant ghost wordmark */}
      <div
        className="pointer-events-none absolute inset-x-0 select-none text-center font-display leading-[0.8] text-white"
        style={{ top: "12%", zIndex: 2, fontSize: "clamp(90px, 28vw, 380px)", letterSpacing: "-0.02em", opacity: 1 }}
      >
        PROCLEAN
      </div>

      {/* brand label */}
      <div
        className="absolute top-6 left-4 flex items-center gap-2 sm:left-8"
        style={{ zIndex: 60 }}
      >
        <img
          src={logo.url}
          alt="ProClean Detergents logo"
          className="h-8 w-8 rounded-full bg-white object-contain p-0.5"
        />
        <span className="text-xs font-semibold text-white" style={{ letterSpacing: "0.18em" }}>
          PROCLEAN
        </span>
      </div>

      {/* bottle stack */}
      <div className="absolute inset-0" style={{ zIndex: 4 }}>
        {PRODUCTS.map((p, i) => {
          const role = roleOf(i);
          if (!role) return null;
          return (
            <img
              key={p.id}
              src={p.image}
              alt={p[lang].name}
              draggable={false}
              className="absolute top-1/2 w-auto object-contain drop-shadow-2xl"
              style={styleFor(role)}
            />
          );
        })}
      </div>

      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 50, opacity: 0.4, backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
      />

      {/* bottom controls */}
      <div
        className="absolute bottom-8 left-4 max-w-sm sm:left-8"
        style={{ zIndex: 60 }}
      >
        <p className="font-display text-2xl text-white sm:text-3xl">{t("heroKicker")}</p>
        <p className="mt-1 text-sm font-medium text-white/90">{current[lang].name}</p>
        <p className="mt-2 line-clamp-3 text-xs text-white/75">{current[lang].desc}</p>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => move(-1)}
            aria-label="Previous product"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/50 text-white transition-colors hover:bg-white/15"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => move(1)}
            aria-label="Next product"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/50 text-white transition-colors hover:bg-white/15"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <span className="text-xs tabular-nums text-white/70">
            {active + 1} / {n}
          </span>
        </div>
      </div>

      <a
        href="#catalog"
        className="absolute bottom-24 right-4 flex items-center gap-2 sm:bottom-28 font-display text-xl text-white sm:right-8 sm:text-2xl"
        style={{ zIndex: 60 }}
      >
        {t("discover")}
        <ArrowRight className="h-6 w-6" />
      </a>
    </section>
  );
}
