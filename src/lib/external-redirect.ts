import { toast } from "sonner";
import type { Lang } from "@/lib/store";

const MESSAGES: Record<Lang, (platform: string) => string> = {
  en: (platform) => `Leaving ProClean — taking you to ${platform}...`,
  ar: (platform) => `مغادرة موقع بروكلين — سيتم نقلك إلى ${platform}...`,
};

/**
 * Shows a brief "leaving this site" notice. Pair with `target="_top"` on
 * the actual <a> tag (not a JS-driven redirect) so the browser navigates
 * immediately, on the real click, at the top-level browsing context -
 * this both escapes any embedding iframe (Facebook/Instagram refuse to
 * render inside one and show a connection error otherwise) and avoids
 * async delays that can invalidate the click's navigation permission.
 */
export function notifyLeaving(platform: string, lang: Lang) {
  toast.message(MESSAGES[lang](platform));
}
