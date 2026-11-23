import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/public/Home";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProfilePage from "./pages/admin/ProfilePage";
import {
  CertificationsPage,
  EducationPage,
  ExperiencePage,
  ProjectsPage,
  SkillsPage,
} from "./pages/admin/entityPages";
import SocialPage from "./pages/admin/SocialPage";
import MessagesPage from "./pages/admin/MessagesPage";
import SettingsPage from "./pages/admin/SettingsPage";

export default function App() {
  return (
    <AuthProvider>
      <Toaster
        toastOptions={{
          style: { background: "#222", color: "#fff", border: "1px solid rgba(255,214,0,0.2)" },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="certifications" element={<CertificationsPage />} />
          <Route path="social" element={<SocialPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
