import { Github, Instagram, Linkedin, Mail, Globe } from "lucide-react";

export default function SocialIcons({ social, className = "" }) {
  if (!social) return null;
  const items = [
    social.github && { href: social.github, icon: Github, label: "GitHub" },
    social.linkedin && { href: social.linkedin, icon: Linkedin, label: "LinkedIn" },
    social.instagram && { href: social.instagram, icon: Instagram, label: "Instagram" },
    social.website && { href: social.website, icon: Globe, label: "Website" },
    social.email && { href: `mailto:${social.email}`, icon: Mail, label: "Email" },
  ].filter(Boolean);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mute transition hover:border-accent hover:text-accent"
        >
          <item.icon size={18} />
        </a>
      ))}
    </div>
  );
}
