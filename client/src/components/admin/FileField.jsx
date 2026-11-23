import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/client";

export default function FileField({ label, value, accept, onUploaded }) {
  const [busy, setBusy] = useState(false);

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    setBusy(true);
    try {
      const { data } = await api.post("/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUploaded(data.url);
      toast.success("File uploaded");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <label className="label">{label}</label>
      {value ? (
        <p className="mb-2 truncate text-xs text-mute">{value}</p>
      ) : null}
      <input type="file" accept={accept} onChange={upload} disabled={busy} className="text-sm text-mute" />
    </div>
  );
}
