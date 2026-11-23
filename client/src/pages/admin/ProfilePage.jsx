import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/client";
import FileField from "../../components/admin/FileField";

const empty = {
  name: "",
  headline: "",
  tagline: "",
  introduction: "",
  about: "",
  image: "",
  resumeUrl: "",
  email: "",
  phone: "",
  location: "",
  availability: "",
  roles: [],
  careerInterests: [],
  technicalInterests: [],
};

export default function ProfilePage() {
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get("/profile").then((res) => setForm({ ...empty, ...res.data }));
  }, []);

  const list = (key) => (Array.isArray(form[key]) ? form[key].join(", ") : "");
  const setList = (key, value) =>
    setForm({
      ...form,
      [key]: value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data } = await api.put("/profile", form);
      setForm(data);
      toast.success("Profile saved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold">Profile</h1>
      <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="input" placeholder="Headline" value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
      <input className="input" placeholder="Tagline" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
      <textarea className="input min-h-24" placeholder="Introduction headline" value={form.introduction} onChange={(e) => setForm({ ...form, introduction: e.target.value })} />
      <textarea className="input min-h-32" placeholder="About me" value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
      <input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input className="input" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <input className="input" placeholder="Availability" value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} />
      <input className="input" placeholder="Roles (comma separated)" value={list("roles")} onChange={(e) => setList("roles", e.target.value)} />
      <input className="input" placeholder="Career interests (comma separated)" value={list("careerInterests")} onChange={(e) => setList("careerInterests", e.target.value)} />
      <input className="input" placeholder="Technical interests (comma separated)" value={list("technicalInterests")} onChange={(e) => setList("technicalInterests", e.target.value)} />
      <FileField label="Profile image" accept="image/*" value={form.image} onUploaded={(url) => setForm({ ...form, image: url })} />
      <FileField label="Resume PDF" accept="application/pdf" value={form.resumeUrl} onUploaded={(url) => setForm({ ...form, resumeUrl: url })} />
      <button className="btn-primary" disabled={busy}>
        {busy ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
