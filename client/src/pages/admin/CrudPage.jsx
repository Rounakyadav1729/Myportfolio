import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/client";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import FileField from "../../components/admin/FileField";

export default function CrudPage({ title, endpoint, fields, empty }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  const load = async () => {
    const { data } = await api.get(endpoint);
    setItems(data);
  };

  useEffect(() => {
    load().catch(() => toast.error("Failed to load"));
  }, [endpoint]);

  const startCreate = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };

  const startEdit = (item) => {
    setEditing(item._id);
    setForm({ ...empty, ...item });
    setOpen(true);
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editing) await api.put(`${endpoint}/${editing}`, form);
      else await api.post(endpoint, form);
      toast.success("Saved");
      setOpen(false);
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`${endpoint}/${pendingDelete}`);
      toast.success("Deleted");
      setPendingDelete(null);
      await load();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        <button className="btn-primary" onClick={startCreate}>
          Add
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item._id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium">{item[fields[0].key] || item.title || item.name}</p>
              <p className="text-sm text-mute">{item[fields[1]?.key] || ""}</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost px-4 py-2" onClick={() => startEdit(item)}>
                Edit
              </button>
              <button className="rounded-full bg-red-500/20 px-4 py-2 text-sm text-red-300" onClick={() => setPendingDelete(item._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4">
          <form onSubmit={save} className="card max-h-[90vh] w-full max-w-lg overflow-y-auto p-6">
            <h2 className="mb-4 text-xl font-bold">{editing ? "Edit" : "Add"} {title}</h2>
            {fields.map((field) => (
              <div key={field.key} className="mb-3">
                <label className="label">{field.label}</label>
                {field.type === "file" ? (
                  <FileField
                    label=""
                    accept={field.accept}
                    value={form[field.key]}
                    onUploaded={(url) => setForm({ ...form, [field.key]: url })}
                  />
                ) : field.type === "textarea" ? (
                  <textarea className="input min-h-24" value={form[field.key] || ""} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} />
                ) : field.type === "select" ? (
                  <select className="input" value={form[field.key] || ""} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "list" ? (
                  <input
                    className="input"
                    value={Array.isArray(form[field.key]) ? form[field.key].join(", ") : ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [field.key]: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                ) : field.type === "checkbox" ? (
                  <input type="checkbox" checked={!!form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.checked })} />
                ) : (
                  <input
                    className="input"
                    type={field.type || "text"}
                    value={form[field.key] ?? ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value,
                      })
                    }
                  />
                )}
              </div>
            ))}
            <div className="mt-4 flex justify-end gap-3">
              <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="btn-primary">Save</button>
            </div>
          </form>
        </div>
      ) : null}

      <ConfirmDialog
        open={!!pendingDelete}
        title={`Delete this ${title.toLowerCase()} item?`}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
