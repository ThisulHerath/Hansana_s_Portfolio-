import { profile } from "../data/content";
import FloatingTags from "./FloatingTags";
import "./Hero.css";

const heroTags = [
  { label: "VP · Marketing Circle", top: "10%", left: "2%", rotate: "-6deg", delay: "0s" },
  { label: "Chief Editor, DMT Reflections", top: "24%", right: "1%", rotate: "4deg", delay: "1.2s" },
  { label: "Badminton — Winning Team '23", top: "78%", left: "6%", rotate: "3deg", delay: "0.6s" },
  { label: "Open to internships", top: "68%", right: "3%", rotate: "-3deg", delay: "1.8s" },
];

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <FloatingTags tags={heroTags} />

      <div className="container hero__content">
        <p className="eyebrow">the campaign board of</p>
        <h1 className="hero__name">
          HANSANA
          <br />
          PERERA
        </h1>
        <p className="hero__role">
          {profile.role} · {profile.university}
        </p>
        <p className="hero__tagline">{profile.tagline}</p>

        <div className="hero__actions">
          <a
            href={profile.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            View resume
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
