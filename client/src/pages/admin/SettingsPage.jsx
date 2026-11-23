import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/client";
import FileField from "../../components/admin/FileField";

const defaultNav = [
  { label: "Home", href: "#home", enabled: true },
  { label: "About", href: "#about", enabled: true },
  { label: "Skills", href: "#skills", enabled: true },
  { label: "Projects", href: "#projects", enabled: true },
  { label: "Experience", href: "#experience", enabled: true },
  { label: "Services", href: "#services", enabled: true },
  { label: "Contact", href: "#contact", enabled: true },
];

export default function SettingsPage() {
  const [form, setForm] = useState({
    siteTitle: "",
    logoText: "",
    logoUrl: "",
    footerText: "",
    navigation: defaultNav,
    sections: {
      hero: true,
      about: true,
      skills: true,
      projects: true,
      experience: true,
      services: true,
      contact: true,
    },
    services: [],
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get("/settings").then((res) => setForm((prev) => ({ ...prev, ...res.data })));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data } = await api.put("/settings", form);
      setForm((prev) => ({ ...prev, ...data }));
      toast.success("Settings saved");
    } catch {
      toast.error("Save failed");
    } finally {
      setBusy(false);
    }
  };

  const updateNav = (i, patch) => {
    const navigation = form.navigation.map((item, idx) => (idx === i ? { ...item, ...patch } : item));
    setForm({ ...form, navigation });
  };

  const updateService = (i, patch) => {
    const services = form.services.map((item, idx) => (idx === i ? { ...item, ...patch } : item));
    setForm({ ...form, services });
  };

  return (
    <form onSubmit={save} className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Website settings</h1>
      <input className="input" placeholder="Site title" value={form.siteTitle} onChange={(e) => setForm({ ...form, siteTitle: e.target.value })} />
      <input className="input" placeholder="Logo text" value={form.logoText} onChange={(e) => setForm({ ...form, logoText: e.target.value })} />
      <FileField label="Logo image" accept="image/*" value={form.logoUrl} onUploaded={(url) => setForm({ ...form, logoUrl: url })} />
      <input className="input" placeholder="Footer text" value={form.footerText} onChange={(e) => setForm({ ...form, footerText: e.target.value })} />

      <div>
        <h2 className="mb-3 font-semibold">Sections</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.keys(form.sections || {}).map((key) => (
            <label key={key} className="flex items-center gap-2 text-sm text-mute">
              <input
                type="checkbox"
                checked={form.sections[key]}
                onChange={(e) => setForm({ ...form, sections: { ...form.sections, [key]: e.target.checked } })}
              />
              {key}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-semibold">Navigation</h2>
        {form.navigation.map((item, i) => (
          <div key={i} className="mb-2 grid gap-2 md:grid-cols-[1fr_1fr_auto]">
            <input className="input" value={item.label} onChange={(e) => updateNav(i, { label: e.target.value })} />
            <input className="input" value={item.href} onChange={(e) => updateNav(i, { href: e.target.value })} />
            <label className="flex items-center gap-2 text-sm text-mute">
              <input type="checkbox" checked={item.enabled} onChange={(e) => updateNav(i, { enabled: e.target.checked })} />
              On
            </label>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Services</h2>
          <button
            type="button"
            className="btn-ghost px-4 py-2"
            onClick={() => setForm({ ...form, services: [...form.services, { title: "", description: "", icon: "Sparkles" }] })}
          >
            Add service
          </button>
        </div>
        {form.services.map((item, i) => (
          <div key={i} className="card mb-3 space-y-2 p-4">
            <input className="input" placeholder="Title" value={item.title} onChange={(e) => updateService(i, { title: e.target.value })} />
            <input className="input" placeholder="Icon" value={item.icon} onChange={(e) => updateService(i, { icon: e.target.value })} />
            <textarea className="input" placeholder="Description" value={item.description} onChange={(e) => updateService(i, { description: e.target.value })} />
            <button
              type="button"
              className="text-sm text-red-300"
              onClick={() => setForm({ ...form, services: form.services.filter((_, idx) => idx !== i) })}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button className="btn-primary" disabled={busy}>
        {busy ? "Saving..." : "Save settings"}
      </button>
    </form>
  );
}
