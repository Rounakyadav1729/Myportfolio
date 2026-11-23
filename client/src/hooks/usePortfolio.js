import { useEffect, useState } from "react";
import api from "../api/client";

export function usePortfolio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    Promise.all([
      api.get("/profile"),
      api.get("/skills"),
      api.get("/projects"),
      api.get("/education"),
      api.get("/experience"),
      api.get("/certifications"),
      api.get("/social-links"),
      api.get("/settings"),
    ])
      .then(([profile, skills, projects, education, experience, certifications, social, settings]) => {
        if (!mounted) return;
        setData({
          profile: profile.data,
          skills: skills.data,
          projects: projects.data,
          education: education.data,
          experience: experience.data,
          certifications: certifications.data,
          social: social.data,
          settings: settings.data,
        });
      })
      .catch(() => {
        if (mounted) setError("Unable to load portfolio content.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
