import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { useLang } from "@/lib/store";
import teaserVideo from "@/assets/video/proclean-teaser.mp4";
import teaserPoster from "@/assets/video/proclean-teaser-poster.jpg";

export default function VideoTeaser() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
        <p className="font-display text-2xl sm:text-3xl">{t("video")}</p>
        <p className="text-sm text-muted-foreground">{t("videoBlurb")}</p>
        <button
          type="button"
          onClick={start}
          aria-label={t("video")}
          className="group relative aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-3xl border border-border bg-black shadow-soft"
        >
          <video
            ref={videoRef}
            src={teaserVideo}
            poster={teaserPoster}
            muted
            playsInline
            loop
            onEnded={() => setPlaying(false)}
            controls={playing}
            className="h-full w-full object-cover"
          />
          {!playing && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 shadow-soft">
                <Play className="h-7 w-7 translate-x-0.5 fill-primary text-primary" />
              </span>
            </span>
          )}
        </button>
      </div>
    </section>
  );
}
