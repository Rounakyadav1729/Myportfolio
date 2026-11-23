import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (admin) return <Navigate to="/admin/dashboard" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(email, password);
      toast.success("Welcome back");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <form onSubmit={submit} className="card w-full max-w-md p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Admin</p>
        <h1 className="mt-2 text-3xl font-bold">Sign in</h1>
        <p className="mt-2 text-sm text-mute">Manage portfolio content from a secure dashboard.</p>
        <label className="label mt-8">Email</label>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className="label mt-4">Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn-primary mt-6 w-full" disabled={busy}>
          {busy ? "Signing in..." : "Enter dashboard"}
        </button>
      </form>
    </div>
  );
}
