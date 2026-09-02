import { Instagram, Play } from "lucide-react";
import { useLang } from "@/lib/store";

const REEL_URL =
  "https://www.instagram.com/reel/Dcoa0kTi6_j/?utm_source=ig_web_copy_link&igsi=NTc4MTIwNjQ2YQ==";

export default function VideoTeaser() {
  const { t } = useLang();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
      <a
        href={REEL_URL}
        target="_blank"
        rel="noreferrer"
        className="group flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary to-primary/70 p-8 text-center shadow-soft transition-transform hover:scale-[1.01] sm:flex-row sm:text-left"
      >
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white/25">
          <Play className="h-7 w-7 fill-white text-white" />
        </div>
        <div className="flex-1">
          <p className="font-display text-2xl text-primary-foreground sm:text-3xl">{t("video")}</p>
          <p className="mt-1 text-sm text-primary-foreground/85">{t("videoBlurb")}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary transition-opacity group-hover:opacity-90">
          <Instagram className="h-4 w-4" />
          {t("videoCta")}
        </span>
      </a>
    </section>
  );
}
