import { profile } from "../data/content";
import "./Navbar.css";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <a href="#top" className="navbar__brand">
          HP<span>.</span>
        </a>
        <nav className="navbar__links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
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
