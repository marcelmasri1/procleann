import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { LINKS, useLang } from "@/lib/store";
import logo from "@/assets/proclean-logo.jpg.asset.json";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={logo.url}
            alt="ProClean Detergents"
            className="h-12 w-12 shrink-0 rounded-full bg-white object-contain p-1"
          />
          <div className="min-w-0">
            <p className="font-display text-xl text-card-foreground">PROCLEAN DETERGENTS</p>
            <p className="text-xs text-muted-foreground">{t("tagline")} · Lebanon · +961 79 001 163</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={LINKS.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-foreground"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ProClean Detergents. {t("rights")}
      </p>
    </footer>
  );
}
