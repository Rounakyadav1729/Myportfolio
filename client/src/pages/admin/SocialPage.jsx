import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/client";

export default function SocialPage() {
  const [form, setForm] = useState({ github: "", linkedin: "", instagram: "", twitter: "", email: "", website: "" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get("/social-links").then((res) => setForm(res.data));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data } = await api.put("/social-links", form);
      setForm(data);
      toast.success("Social links updated");
    } catch {
      toast.error("Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="max-w-xl space-y-4">
      <h1 className="text-3xl font-bold">Social links</h1>
      {Object.keys(form)
        .filter((k) => !k.startsWith("_") && k !== "__v" && k !== "createdAt" && k !== "updatedAt")
        .map((key) => (
          <div key={key}>
            <label className="label">{key}</label>
            <input className="input" value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
          </div>
        ))}
      <button className="btn-primary" disabled={busy}>
        {busy ? "Saving..." : "Save links"}
      </button>
    </form>
  );
}
