import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { useCart, useLang, whatsappUrl } from "@/lib/store";
import { notifyLeaving } from "@/lib/external-redirect";
import { placeOrder } from "@/lib/orders.functions";

export default function CartDrawer() {
  const { lang, t } = useLang();
  const { open, setOpen, detailed, setQty, clear, total, count } = useCart();
  const submit = useServerFn(placeOrder);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    note: "",
  });
  const [busy, setBusy] = useState(false);

  const send = async () => {
    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    if (fullName.length < 2 || form.phone.trim().length < 6 || !detailed.length) {
      toast.error(t("orderFail"));
      return;
    }
    setBusy(true);
    try {
      const res = await submit({
        data: {
          customer_name: fullName,
          customer_phone: form.phone,
          address: form.address,
          note: form.note,
          items: detailed.map((l) => ({
            id: l.product.id,
            name: l.product.en.name,
            qty: l.qty,
            price: l.product.price,
          })),
          total: Number(total.toFixed(2)),
        },
      });
      if (res.ok) {
        toast.success(t("orderOk"));
        clear();
        setOpen(false);
      } else {
        toast.error(t("orderFail"));
      }
    } catch {
      toast.error(t("orderFail"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={t("cart")}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
      >
        <ShoppingBag className="h-5 w-5" />
        <span className="tabular-nums">{count}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close cart"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-foreground/50"
          />
          <aside className="absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-card shadow-2xl">
            <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border p-4">
              <h2 className="truncate font-display text-2xl text-card-foreground">{t("cart")}</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="shrink-0 text-muted-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4">
              {!detailed.length && <p className="text-sm text-muted-foreground">{t("empty")}</p>}
              <ul className="space-y-3">
                {detailed.map(({ product, qty }) => (
                  <li
                    key={product.id}
                    className="flex items-center gap-3 rounded-xl border border-border p-2"
                  >
                    <div
                      className="grid h-16 w-16 shrink-0 place-items-center rounded-lg"
                      style={{ background: product.panel }}
                    >
                      <img src={product.image} alt="" className="h-14 w-auto object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-card-foreground">
                        {product[lang].name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.size} · ${product.price.toFixed(2)}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          onClick={() => setQty(product.id, qty - 1)}
                          aria-label="Decrease"
                          className="grid h-7 w-7 place-items-center rounded-full border border-border"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{qty}</span>
                        <button
                          onClick={() => setQty(product.id, qty + 1)}
                          aria-label="Increase"
                          className="grid h-7 w-7 place-items-center rounded-full border border-border"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => setQty(product.id, 0)}
                          aria-label="Remove"
                          className="ms-auto text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {detailed.length > 0 && (
                <div className="mt-6 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder={t("firstName")}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                    <input
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder={t("lastName")}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder={t("phone")}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  />
                  <input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder={t("address")}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  />
                  <textarea
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    placeholder={t("note")}
                    rows={2}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              )}
            </div>

            <footer className="space-y-3 border-t border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("total")}</span>
                <span className="font-display text-2xl text-card-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>
              <a
                href={whatsappUrl(detailed, total, lang)}
                target="_top"
                rel="noreferrer"
                onClick={() => {
                  if (detailed.length) notifyLeaving("WhatsApp", lang);
                }}
                className="block rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground"
              >
                {t("waCheckout")}
              </a>
              <button
                onClick={send}
                disabled={busy || !detailed.length}
                className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
              >
                {t("saveOrder")}
              </button>
              {detailed.length > 0 && (
                <button
                  onClick={clear}
                  className="w-full text-xs text-muted-foreground hover:text-destructive"
                >
                  {t("clear")}
                </button>
              )}
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}
