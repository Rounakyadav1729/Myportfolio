import { motion } from "framer-motion";
import { ArrowRight, Download, ExternalLink, Github, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/client";
import AnimatedRoles from "../../components/AnimatedRoles";
import Navbar from "../../components/Navbar";
import SectionHeading from "../../components/SectionHeading";
import SocialIcons from "../../components/SocialIcons";
import { Icon } from "../../lib/icons";
import { usePortfolio } from "../../hooks/usePortfolio";

function PlaceholderPhoto({ name }) {
  const letter = (name || "P").charAt(0).toUpperCase();
  return (
    <div className="flex h-full w-full items-center justify-center bg-slateish text-5xl font-bold text-accent">
      {letter}
    </div>
  );
}

export default function Home() {
  const { data, loading, error } = usePortfolio();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!data) return;
    document.title = data.settings?.siteTitle || data.profile?.name || "Portfolio";
  }, [data]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center text-mute">
        {error || "No content yet. Start the API and seed the database."}
      </div>
    );
  }

  const { profile, skills, projects, education, experience, certifications, social, settings } = data;
  const sections = settings.sections || {};
  const grouped = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/messages", form);
      toast.success("Message sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <Navbar settings={settings} />
      {sections.hero !== false && (
        <section id="home" className="relative overflow-hidden px-5 pb-24 pt-32">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-mute">Portfolio</p>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                {profile.introduction || `Hi, I'm ${profile.name}`}
              </h1>
              <div className="mt-5 flex items-center gap-2 text-lg">
                <span className="text-mute">I am a</span>
                <AnimatedRoles roles={profile.roles} />
              </div>
              <p className="mt-5 max-w-xl text-lg text-mute">{profile.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="btn-primary">
                  View My Work <ArrowRight size={16} />
                </a>
                <a href="#contact" className="btn-ghost">
                  Contact Me
                </a>
              </div>
              <SocialIcons social={social} className="mt-8" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative mx-auto h-80 w-72 overflow-hidden rounded-[2rem] border border-white/10 shadow-glow md:h-[420px] md:w-96"
            >
              {profile.image ? (
                <img src={profile.image} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                <PlaceholderPhoto name={profile.name} />
              )}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-ink/80 p-4 backdrop-blur">
                <p className="text-sm font-semibold">{profile.name}</p>
                <p className="text-xs text-accent">{profile.headline}</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {sections.about !== false && (
        <section id="about" className="bg-slateish px-5 py-24">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <SectionHeading kicker="About" title="A precise, product-minded builder." description={profile.about} />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="card p-5">
                  <p className="text-xs uppercase tracking-widest text-accent">Career interests</p>
                  <ul className="mt-3 space-y-2 text-sm text-mute">
                    {(profile.careerInterests || []).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="card p-5">
                  <p className="text-xs uppercase tracking-widest text-accent">Technical interests</p>
                  <ul className="mt-3 space-y-2 text-sm text-mute">
                    {(profile.technicalInterests || []).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {profile.resumeUrl ? (
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-primary mt-8">
                  <Download size={16} /> Download Resume
                </a>
              ) : null}
            </div>
            <div className="card overflow-hidden">
              <div className="h-72">
                {profile.image ? (
                  <img src={profile.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <PlaceholderPhoto name={profile.name} />
                )}
              </div>
              <div className="space-y-3 p-6 text-sm text-mute">
                {profile.location ? (
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-accent" /> {profile.location}
                  </p>
                ) : null}
                {profile.email ? (
                  <p className="flex items-center gap-2">
                    <Mail size={16} className="text-accent" /> {profile.email}
                  </p>
                ) : null}
                <p className="rounded-full border border-accent/30 px-3 py-1 text-xs text-accent">{profile.availability}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {sections.skills !== false && (
        <section id="skills" className="px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading kicker="Skills" title="A stacked, production-ready toolkit." />
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="card p-6">
                  <h3 className="mb-5 font-semibold text-accent">{category}</h3>
                  <div className="space-y-4">
                    {items.map((skill) => (
                      <div key={skill._id}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Icon name={skill.icon} size={16} className="text-accent" />
                            {skill.name}
                          </span>
                          <span className="text-mute">{skill.proficiency}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-accent" style={{ width: `${skill.proficiency}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.projects !== false && (
        <section id="projects" className="bg-slateish px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading kicker="Projects" title="Selected work, built with intent." />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((item) => (
                <article key={item._id} className="card overflow-hidden transition hover:-translate-y-1 hover:border-accent/40">
                  <div className="h-44 bg-ink">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-accent/80">{item.title}</div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-mute">{item.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(item.technologies || []).map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-mute">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3 text-sm">
                      {item.githubUrl ? (
                        <a href={item.githubUrl} target="_blank" rel="noreferrer" className="text-mute hover:text-accent">
                          <Github size={16} className="inline" /> GitHub
                        </a>
                      ) : null}
                      {item.liveUrl ? (
                        <a href={item.liveUrl} target="_blank" rel="noreferrer" className="text-mute hover:text-accent">
                          <ExternalLink size={16} className="inline" /> Live
                        </a>
                      ) : null}
                      <button onClick={() => setProject(item)} className="text-accent">
                        Details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.experience !== false && (
        <section id="experience" className="px-5 py-24">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
            <div>
              <SectionHeading kicker="Education" title="Academic path." />
              <div className="space-y-5 border-l border-white/10 pl-6">
                {education.map((item) => (
                  <div key={item._id} className="relative">
                    <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-accent" />
                    <p className="text-xs text-accent">
                      {item.startYear} — {item.endYear}
                    </p>
                    <h3 className="mt-1 font-semibold">{item.degree}</h3>
                    <p className="text-sm text-mute">
                      {item.institution}
                      {item.field ? ` · ${item.field}` : ""}
                    </p>
                    {item.description ? <p className="mt-2 text-sm text-mute">{item.description}</p> : null}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading kicker="Experience" title="Internships & work." />
              <div className="space-y-4">
                {experience.map((item) => (
                  <div key={item._id} className="card p-5">
                    <p className="text-xs text-accent">{item.type}</p>
                    <h3 className="mt-1 font-semibold">{item.role}</h3>
                    <p className="text-sm text-mute">
                      {item.company} · {item.startDate} — {item.endDate}
                    </p>
                    <p className="mt-2 text-sm text-mute">{item.description}</p>
                  </div>
                ))}
              </div>
              <h3 className="mb-4 mt-10 text-xl font-semibold">Certifications & achievements</h3>
              <div className="space-y-3">
                {certifications.map((item) => (
                  <div key={item._id} className="flex items-start justify-between rounded-xl border border-white/10 p-4">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-mute">
                        {item.issuer} {item.year ? `· ${item.year}` : ""}
                      </p>
                    </div>
                    <span className="text-xs text-accent">{item.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {sections.services !== false && (
        <section id="services" className="bg-slateish px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading kicker="Services" title="What I do." />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {(settings.services || []).map((item) => (
                <div key={item.title} className="card p-6 transition hover:border-accent/40">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon name={item.icon} />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-mute">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.contact !== false && (
        <section id="contact" className="px-5 py-24">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
            <div>
              <SectionHeading
                kicker="Contact"
                title="Let's build something sharp."
                description="Send a brief note. I read every message from the admin inbox."
              />
              <p className="mb-2 text-sm text-mute">{profile.email}</p>
              <p className="mb-6 inline-flex rounded-full border border-accent/30 px-3 py-1 text-xs text-accent">
                {profile.availability}
              </p>
              <SocialIcons social={social} />
            </div>
            <form onSubmit={submit} className="card space-y-4 p-6">
              <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <input className="input" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              <textarea className="input min-h-32" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              <button className="btn-primary w-full" disabled={sending}>
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>
      )}

      <footer className="border-t border-white/5 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-semibold">
              {settings.logoText}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-1 text-sm text-mute">{settings.footerText}</p>
            <p className="mt-2 text-xs text-mute">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-mute">
            {(settings.navigation || [])
              .filter((n) => n.enabled)
              .map((n) => (
                <a key={n.href} href={n.href} className="hover:text-accent">
                  {n.label}
                </a>
              ))}
          </div>
          <SocialIcons social={social} />
        </div>
      </footer>

      {project ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4" onClick={() => setProject(null)}>
          <div className="card max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="mt-3 text-mute">{project.details || project.description}</p>
            <button className="btn-ghost mt-6" onClick={() => setProject(null)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
