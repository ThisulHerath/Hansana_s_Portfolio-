import { profile } from "../data/content";
import { useEffect, useRef, useState } from 'react';
import "./Navbar.css";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 759px)').matches);
  const menuRef = useRef(null);
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') { setOpen(false); if (menuRef.current?.getAttribute('aria-expanded') === 'true') menuRef.current.focus(); } };
    const resize = () => {
      const compact = window.matchMedia('(max-width: 759px)').matches;
      setMobile(compact);
      if (!compact) setOpen(false);
    };
    window.addEventListener('keydown', close);
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('resize', resize); };
  }, []);
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <a href="#top" className="navbar__brand">
          HP<span>.</span>
        </a>
        <button ref={menuRef} className="navbar__menu" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>Menu <span className="navbar__menu-icon" aria-hidden="true" /></button>
        <nav id="primary-navigation" aria-label="Main navigation" inert={mobile && !open} className={`navbar__links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} aria-current={activeSection === link.href.slice(1) ? 'location' : undefined} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={profile.resumeFile}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__cta"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
