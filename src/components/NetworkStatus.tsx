import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useLang } from "@/lib/store";

/** Shows a persistent toast while offline and a confirmation when connectivity returns. */
export default function NetworkStatus() {
  const { t } = useLang();
  const wasOffline = useRef(false);

  useEffect(() => {
    const OFFLINE_ID = "pc-offline";

    const goOffline = () => {
      wasOffline.current = true;
      toast.error(t("offline"), { id: OFFLINE_ID, duration: Infinity });
    };
    const goOnline = () => {
      toast.dismiss(OFFLINE_ID);
      if (wasOffline.current) {
        wasOffline.current = false;
        toast.success(t("backOnline"));
      }
    };

    if (!navigator.onLine) goOffline();
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, [t]);

  return null;
}
