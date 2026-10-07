import { profile } from "../data/content";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__content">
        <div className="hero__meta"><span className="availability"><i /> Open to internships</span><span>COLOMBO, LK · PORTFOLIO / 2026</span></div>
        <div className="hero__layout"><div>
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
        </div><div className="hero__board" aria-label="Creative strategy, design and leadership">
          <span className="board__coordinate">IDEAS IN ORBIT / 01</span>
          <div className="board__orbit" aria-hidden="true" />
          <div className="board__note board__note--lime"><span>01 / THINK</span><strong>Strategy<br />with soul.</strong><small>Curiosity → insight → ideas</small></div>
          <div className="board__note board__note--paper"><span>02 / MAKE</span><strong>Make it<br />mean something.</strong><small>Design · stories · campaigns</small></div>
          <div className="board__label">↗ Marketing Circle, NSBM<br /><strong>Vice President</strong></div>
          <span className="board__spark" aria-hidden="true">✳</span>
        </div></div>
        <div className="hero__bottom"><span>STRATEGY / DESIGN / GETTING IT DONE</span><a href="#about">Scroll to discover <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
  );
}
