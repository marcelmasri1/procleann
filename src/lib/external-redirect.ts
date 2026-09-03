import { toast } from "sonner";
import type { Lang } from "@/lib/store";

const MESSAGES: Record<Lang, (platform: string) => string> = {
  en: (platform) => `Leaving ProClean — taking you to ${platform}...`,
  ar: (platform) => `مغادرة موقع بروكلين — سيتم نقلك إلى ${platform}...`,
};

/**
 * Shows a brief "leaving this site" notice, then navigates the CURRENT tab
 * to the external destination (Instagram, Facebook, WhatsApp, etc.) instead
 * of silently opening a background tab the visitor might not notice.
 */
export function goExternal(url: string, platform: string, lang: Lang) {
  toast.message(MESSAGES[lang](platform));
  window.setTimeout(() => {
    window.location.href = url;
  }, 700);
}
