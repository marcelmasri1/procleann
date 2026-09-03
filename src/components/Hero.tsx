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
  const [entered, setEntered] = useState(false);

  // subtle fade + rise entrance on first paint.
  // a single requestAnimationFrame can fire before the browser has painted
  // the initial (hidden) state, which makes the transition invisible — so
  // we wait two frames to guarantee the "before" state is actually shown first.
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

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

  const scrollToCatalog = useCallback(() => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToProduct = useCallback((id: string) => {
    const el = document.getElementById(`product-${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("pc-highlight");
    window.setTimeout(() => el.classList.remove("pc-highlight"), 1600);
  }, []);

  const roleOf = (i: number): Role | null => {
    if (i === active) return "center";
    if (i === (active + n - 1) % n) return "left";
    if (i === (active + 1) % n) return "right";
    if (i === (active + 2) % n) return "back";
    return null;
  };

  const styleFor = (role: Role) => {
    const base = {
      center: {
        blur: 0,
        opacity: 1,
        z: 20,
        left: "50%",
        size: mobile ? "min(52vh, 68vw)" : "min(62vh, 42vw)",
      },
      left: {
        blur: 2,
        opacity: 0.85,
        z: 1,
        left: mobile ? "16%" : "26%",
        size: mobile ? "min(30vh, 34vw)" : "min(38vh, 22vw)",
      },
      right: {
        blur: 2,
        opacity: 0.85,
        z: 1,
        left: mobile ? "84%" : "74%",
        size: mobile ? "min(30vh, 34vw)" : "min(38vh, 22vw)",
      },
      back: {
        blur: 4,
        opacity: 1,
        z: 1,
        left: "50%",
        size: mobile ? "min(24vh, 28vw)" : "min(30vh, 18vw)",
      },
    }[role];

    return {
      left: base.left,
      height: base.size,
      zIndex: base.z,
      opacity: base.opacity,
      filter: base.blur ? `blur(${base.blur}px)` : "none",
      transform: "translate(-50%, -50%)",
      transition: `all ${EASE}`,
    } as const;
  };

  const current = PRODUCTS[active]!;

  return (
    <section
      className="relative h-[100vh] w-full overflow-hidden"
      style={{
        backgroundColor: current.color,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0) scale(1)" : "translateY(14px) scale(1.02)",
        transition: `background-color ${EASE}, opacity 750ms ease-out, transform 750ms ease-out`,
      }}
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
        style={{
          top: "10%",
          zIndex: 2,
          fontSize: "clamp(64px, 19vw, 250px)",
          letterSpacing: "-0.02em",
          opacity: 1,
        }}
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

      {/* bottle stack — no z-index here on purpose: each bottle sets its own,
          so the side/back ones can sit behind the wordmark below while the
          active one sits in front of it */}
      <div className="absolute inset-0">
        {PRODUCTS.map((p, i) => {
          const role = roleOf(i);
          if (!role) return null;
          const isCenter = role === "center";
          return (
            <button
              key={p.id}
              type="button"
              onClick={isCenter ? () => scrollToProduct(p.id) : undefined}
              aria-label={isCenter ? p[lang].name : undefined}
              aria-hidden={!isCenter}
              tabIndex={isCenter ? 0 : -1}
              className={`absolute top-1/2 w-auto border-0 bg-transparent p-0 ${
                isCenter ? "cursor-pointer" : "pointer-events-none cursor-default"
              }`}
              style={styleFor(role)}
            >
              <img
                src={p.image}
                alt={p[lang].name}
                draggable={false}
                className="h-full w-auto object-contain drop-shadow-2xl"
              />
            </button>
          );
        })}
      </div>

      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 50, opacity: 0.4, backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
      />

      {/* bottom controls */}
      <div className="absolute bottom-8 left-4 max-w-sm sm:left-8" style={{ zIndex: 60 }}>
        <p className="font-display text-2xl text-white sm:text-3xl">{t("heroKicker")}</p>
        <p className="mt-1 text-sm font-medium text-white/90">{current[lang].name}</p>
        <p className="mt-2 line-clamp-3 text-xs text-white/75">{current[lang].desc}</p>
        <div dir="ltr" className="mt-4 flex items-center gap-3">
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

      <button
        type="button"
        onClick={scrollToCatalog}
        className="absolute bottom-24 right-4 flex items-center gap-2 border-0 bg-transparent p-0 sm:bottom-28 font-display text-xl text-white sm:right-8 sm:text-2xl"
        style={{ zIndex: 60 }}
      >
        {t("discover")}
        <ArrowRight className="h-6 w-6" />
      </button>
    </section>
  );
}
