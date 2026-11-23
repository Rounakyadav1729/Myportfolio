import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ settings }) {
  const [open, setOpen] = useState(false);
  const nav = (settings?.navigation || []).filter((n) => n.enabled);
  const logo = settings?.logoUrl ? (
    <img src={settings.logoUrl} alt="logo" className="h-8" />
  ) : (
    <span className="text-lg font-bold tracking-tight">
      {settings?.logoText || "PORTFOLIO"}
      <span className="text-accent">.</span>
    </span>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#home">{logo}</a>
        <nav className="hidden items-center gap-8 text-sm text-mute md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-accent">
              {item.label}
            </a>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/5 bg-ink px-5 py-4 md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-mute hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
