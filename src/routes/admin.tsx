import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  listProducts,
  verifyAdminPassword,
  adminUpsertProduct,
  adminDeleteProduct,
  adminUploadImage,
} from "@/lib/products.functions";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type Row = {
  id: string;
  image_url: string | null;
  price: number;
  size: string;
  category: "surface" | "laundry" | "dish" | "care";
  color: string;
  panel: string;
  name_en: string;
  desc_en: string;
  name_ar: string;
  desc_ar: string;
  sort_order: number;
};

const BLANK: Row = {
  id: "",
  image_url: "",
  price: 0,
  size: "",
  category: "surface",
  color: "#2C4A9E",
  panel: "#4B7FC4",
  name_en: "",
  desc_en: "",
  name_ar: "",
  desc_ar: "",
  sort_order: 99,
};

function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);

  const [rows, setRows] = useState<Row[] | null>(null);
  const [draft, setDraft] = useState<Row>(BLANK);
  const [busy, setBusy] = useState(false);

  const fetchList = useServerFn(listProducts);
  const checkPw = useServerFn(verifyAdminPassword);
  const upsert = useServerFn(adminUpsertProduct);
  const del = useServerFn(adminDeleteProduct);

  const loadProducts = async () => {
    const data = await fetchList();
    setRows(data as unknown as Row[]);
  };

  useEffect(() => {
    if (unlocked) void loadProducts();
  }, [unlocked]);

  const login = async () => {
    setChecking(true);
    try {
      const res = await checkPw({ data: { password: pwInput } });
      if (res.ok) {
        setPassword(pwInput);
        setUnlocked(true);
      } else {
        toast.error("Wrong password.");
      }
    } catch (err) {
      console.error("admin login failed:", err);
      toast.error("Couldn't reach the server. Try again in a moment.");
    } finally {
      setChecking(false);
    }
  };


  const save = async (row: Row) => {
    setBusy(true);
    try {
      const res = await upsert({ data: { password, product: row } });
      if (res.ok) {
        toast.success(`Saved: ${row.name_en || row.id}`);
        await loadProducts();
        setDraft(BLANK);
      } else {
        toast.error("Save failed — check the fields and try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm(`Delete "${id}"? This can't be undone.`)) return;
    setBusy(true);
    try {
      const res = await del({ data: { password, id } });
      if (res.ok) {
        toast.success("Deleted.");
        await loadProducts();
      } else {
        toast.error("Delete failed.");
      }
    } finally {
      setBusy(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6">
        <p className="font-display text-2xl">ADMIN LOGIN</p>
        <input
          type="password"
          value={pwInput}
          onChange={(e) => setPwInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && login()}
          placeholder="Password"
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
        <button
          onClick={login}
          disabled={checking}
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {checking ? "Checking..." : "Enter"}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="font-display text-3xl">ADMIN · PRODUCTS</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Edit pricing, wording, and images. Changes save straight to the database — no redeploy
        needed.
      </p>

      <div className="mt-8 space-y-3">
        {rows === null && <p className="text-sm text-muted-foreground">Loading…</p>}
        {rows?.map((row) => (
          <ProductRow
            key={row.id}
            row={row}
            password={password}
            onSave={save}
            onDelete={remove}
            busy={busy}
          />
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-border p-4">
        <p className="mb-3 font-display text-xl">ADD PRODUCT</p>
        <ProductForm row={draft} onChange={setDraft} password={password} />
        <button
          onClick={() => save(draft)}
          disabled={busy || !draft.id || !draft.name_en}
          className="mt-3 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          Add product
        </button>
        <p className="mt-2 text-xs text-muted-foreground">
          "Id" must be unique (e.g. "p12"). You can upload a photo or paste an image link.
        </p>
      </div>
    </div>
  );
}

function ProductRow({
  row,
  password,
  onSave,
  onDelete,
  busy,
}: {
  row: Row;
  password: string;
  onSave: (r: Row) => void;
  onDelete: (id: string) => void;
  busy: boolean;
}) {
  const [local, setLocal] = useState(row);
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <ProductForm row={local} onChange={setLocal} password={password} idLocked />
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onSave(local)}
          disabled={busy}
          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-60"
        >
          Save
        </button>
        <button
          onClick={() => onDelete(row.id)}
          disabled={busy}
          className="rounded-full border border-destructive px-4 py-2 text-xs font-semibold text-destructive disabled:opacity-60"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function ProductForm({
  row,
  onChange,
  password,
  idLocked,
}: {
  row: Row;
  onChange: (r: Row) => void;
  password: string;
  idLocked?: boolean;
}) {
  const set = <K extends keyof Row>(key: K, value: Row[K]) => onChange({ ...row, [key]: value });
  const field = "rounded-lg border border-input bg-background px-3 py-2 text-sm w-full";
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <input
        className={field}
        placeholder="id (e.g. p12)"
        value={row.id}
        disabled={idLocked}
        onChange={(e) => set("id", e.target.value)}
      />
      <select
        className={field}
        value={row.category}
        onChange={(e) => set("category", e.target.value as Row["category"])}
      >
        <option value="surface">surface</option>
        <option value="laundry">laundry</option>
        <option value="dish">dish</option>
        <option value="care">care</option>
      </select>
      <input
        className={field}
        placeholder="size (e.g. 3 L)"
        value={row.size}
        onChange={(e) => set("size", e.target.value)}
      />
      <input
        className={field}
        type="number"
        step="0.01"
        placeholder="price"
        value={row.price}
        onChange={(e) => set("price", Number(e.target.value))}
      />
      <input
        className={field}
        placeholder="hero color (#hex)"
        value={row.color}
        onChange={(e) => set("color", e.target.value)}
      />
      <input
        className={field}
        placeholder="hero panel (#hex)"
        value={row.panel}
        onChange={(e) => set("panel", e.target.value)}
      />
      <div className="col-span-2 flex items-center gap-3 sm:col-span-4">
        {row.image_url ? (
          <img
            src={row.image_url}
            alt=""
            className="h-16 w-16 rounded-lg border border-border object-contain"
          />
        ) : null}
        <div className="min-w-0 flex-1 space-y-2">
          <input
            className={field}
            placeholder="image URL (optional — leave blank to keep original photo)"
            value={row.image_url ?? ""}
            onChange={(e) => set("image_url", e.target.value)}
          />
          <ImageUpload password={password} onUploaded={(url) => set("image_url", url)} />
        </div>
      </div>
      <input
        className={`${field} col-span-2`}
        placeholder="Name (English)"
        value={row.name_en}
        onChange={(e) => set("name_en", e.target.value)}
      />
      <input
        className={`${field} col-span-2`}
        placeholder="الاسم (عربي)"
        dir="rtl"
        value={row.name_ar}
        onChange={(e) => set("name_ar", e.target.value)}
      />
      <textarea
        className={`${field} col-span-2`}
        placeholder="Description (English)"
        rows={2}
        value={row.desc_en}
        onChange={(e) => set("desc_en", e.target.value)}
      />
      <textarea
        className={`${field} col-span-2`}
        placeholder="الوصف (عربي)"
        dir="rtl"
        rows={2}
        value={row.desc_ar}
        onChange={(e) => set("desc_ar", e.target.value)}
      />
    </div>
  );
}

function ImageUpload({
  password,
  onUploaded,
}: {
  password: string;
  onUploaded: (url: string) => void;
}) {
  const upload = useServerFn(adminUploadImage);
  const [busy, setBusy] = useState(false);

  const pick = async (file: File) => {
    if (file.size > 8_000_000) {
      toast.error("That photo is too big (max 8 MB).");
      return;
    }
    setBusy(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      const res = await upload({ data: { password, filename: file.name, dataUrl } });
      if (res.ok && "url" in res) {
        onUploaded(res.url);
        toast.success("Photo uploaded — press Save to keep it.");
      } else {
        toast.error("Upload failed. Try a smaller JPG or PNG.");
      }
    } catch (err) {
      console.error("upload failed:", err);
      toast.error("Upload failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
      <span className="rounded-full border border-border px-3 py-1 font-semibold">
        {busy ? "Uploading…" : "Upload photo"}
      </span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void pick(f);
          e.target.value = "";
        }}
      />
    </label>
  );
}
