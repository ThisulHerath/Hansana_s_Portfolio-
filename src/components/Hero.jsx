import { profile } from "../data/content";
import "./Hero.css";
import LiquidAccent from './LiquidAccent';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__content">
        <LiquidAccent className="hero__splash" />
        <div className="hero__meta"><span className="availability"><i /> Open to internships</span><span>COLOMBO, LK · PORTFOLIO / 2026</span></div>
        <div className="hero__layout"><div className="hero__intro">
        <p className="eyebrow">Marketing student. Creative thinker. Doer.</p>
        <h1 className="hero__name">
          HANSANA
          <br />
          <span>PERERA</span><span className="hero__asterisk" aria-hidden="true">✳</span>
        </h1>
        <p className="hero__role">
          <span className="hero__student">Learning brands. Building ideas.</span>
          {profile.role} · {profile.university}
        </p>
        <p className="hero__tagline">{profile.tagline}</p>

        <div className="hero__actions">
          <a href="#work" className="btn btn--primary"><span>Explore my work</span><svg className="hero__button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          <a
            href={profile.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            <span>View resume</span><svg className="hero__button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>
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
