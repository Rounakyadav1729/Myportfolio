import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/client";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

export default function MessagesPage() {
  const [items, setItems] = useState([]);
  const [pending, setPending] = useState(null);

  const load = () => api.get("/messages").then((res) => setItems(res.data));

  useEffect(() => {
    load();
  }, []);

  const toggle = async (item) => {
    await api.patch(`/messages/${item._id}`, { read: !item.read });
    toast.success(item.read ? "Marked unread" : "Marked read");
    load();
  };

  const remove = async () => {
    await api.delete(`/messages/${pending}`);
    toast.success("Deleted");
    setPending(null);
    load();
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Messages</h1>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item._id} className={`card p-5 ${item.read ? "opacity-70" : "border-accent/40"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">
                  {item.name} <span className="text-sm font-normal text-mute">{item.email}</span>
                </p>
                <p className="text-sm text-accent">{item.subject || "No subject"}</p>
                <p className="mt-2 text-sm text-mute">{item.message}</p>
                <p className="mt-2 text-xs text-mute">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost px-4 py-2" onClick={() => toggle(item)}>
                  {item.read ? "Unread" : "Read"}
                </button>
                <button className="rounded-full bg-red-500/20 px-4 py-2 text-sm text-red-300" onClick={() => setPending(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {!items.length ? <p className="text-mute">No messages yet.</p> : null}
      </div>
      <ConfirmDialog open={!!pending} title="Delete this message?" onCancel={() => setPending(null)} onConfirm={remove} />
    </div>
  );
}
