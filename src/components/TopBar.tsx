import { Languages, Moon, Sun } from "lucide-react";
import { useLang, useTheme } from "@/lib/store";

export default function TopBar() {
  const { lang, setLang } = useLang();
  const { dark, toggle } = useTheme();

  return (
    <div className="fixed top-5 end-4 z-[70] flex items-center gap-2 sm:end-8">
      <button
        onClick={() => setLang(lang === "en" ? "ar" : "en")}
        className="inline-flex items-center gap-1 rounded-full border border-white/50 bg-foreground/20 px-3 py-2 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-foreground/30"
      >
        <Languages className="h-4 w-4" />
        {lang === "en" ? "العربية" : "English"}
      </button>
      <button
        onClick={toggle}
        aria-label="Toggle dark mode"
        className="grid h-9 w-9 place-items-center rounded-full border border-white/50 bg-foreground/20 text-white backdrop-blur transition-colors hover:bg-foreground/30"
      >
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </div>
  );
}
