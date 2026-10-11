import { profile } from "../data/content";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__content">
        <div className="hero__meta"><span className="availability"><i /> Open to internships</span><span>COLOMBO, LK · PORTFOLIO / 2026</span></div>
        <div className="hero__layout"><div className="hero__intro">
        <p className="eyebrow">A little strategy. A lot of doing.</p>
        <h1 className="hero__name">
          HANSANA
          <br />
          <span>PERERA</span><span className="hero__asterisk" aria-hidden="true">✳</span>
        </h1>
        <p className="hero__role">
          {profile.role} · {profile.university}
        </p>
        <p className="hero__tagline">{profile.tagline}</p>

        <div className="hero__actions">
          <a href="#work" className="btn btn--primary">Explore my work <span aria-hidden="true">↗</span></a>
          <a
            href={profile.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            View resume
          </a>
        </div>
        </div><figure className="hero__portrait" data-float-target>
          <img src="/hansana-portrait.png" alt={`Portrait of ${profile.name}`} width="640" height="640" fetchPriority="high" decoding="async" />
          <span className="hero__portrait-mark" aria-hidden="true">✳</span>
          <figcaption><span>THE PERSON BEHIND THE IDEAS</span><strong>Strategy with soul.</strong><small>Vice President · Marketing Circle, NSBM</small></figcaption>
        </figure></div>
        <div className="hero__bottom"><span>STRATEGY / DESIGN / GETTING IT DONE</span><a href="#about">Scroll to discover <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
  );
}
