import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  Award,
  Briefcase,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Link2,
  LogOut,
  Mail,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/profile", label: "Profile", icon: User },
  { to: "/admin/skills", label: "Skills", icon: Sparkles },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/education", label: "Education", icon: GraduationCap },
  { to: "/admin/experience", label: "Experience", icon: Briefcase },
  { to: "/admin/certifications", label: "Certifications", icon: Award },
  { to: "/admin/social", label: "Social links", icon: Link2 },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const { admin, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }
  if (!admin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-ink md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b border-white/10 bg-slateish md:min-h-screen md:border-b-0 md:border-r">
        <div className="px-5 py-5">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">CMS</p>
          <h1 className="text-lg font-bold">Admin</h1>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 md:flex-col">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-sm ${
                  isActive ? "bg-accent text-ink" : "text-mute hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <link.icon size={16} />
              {link.label}
            </NavLink>
          ))}
          <button
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-mute hover:text-white"
            onClick={async () => {
              await logout();
              navigate("/admin/login");
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </nav>
      </aside>
      <main className="p-5 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
