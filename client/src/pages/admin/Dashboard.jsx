import { useEffect, useState } from "react";
import api from "../../api/client";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/stats").then((res) => setStats(res.data));
  }, []);

  const cards = [
    ["Projects", stats?.projects],
    ["Skills", stats?.skills],
    ["Messages", stats?.messages],
    ["Unread", stats?.unread],
    ["Education", stats?.education],
    ["Experience", stats?.experience],
    ["Certifications", stats?.certifications],
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Overview</h1>
      <p className="mt-2 text-mute">Website content at a glance. Changes persist in MongoDB.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="card p-5">
            <p className="text-xs uppercase tracking-widest text-mute">{label}</p>
            <p className="mt-2 text-3xl font-bold text-accent">{value ?? "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
