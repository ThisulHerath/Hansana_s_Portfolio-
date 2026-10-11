import { about, profile, stats } from "../data/content";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 className="about__heading">{about.heading}</h2>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="about__paragraph">
              {p}
            </p>
          ))}
        </div>

        <figure className="about__portrait" data-float-target>
          <div className="about__portrait-image">
            <img src="/hansana-portrait.png" alt={`${profile.name} wearing a black suit outdoors`} width="640" height="640" loading="lazy" decoding="async" />
          </div>
          <span className="about__portrait-index" aria-hidden="true">THE PERSON BEHIND THE IDEAS / 01</span>
          <span className="about__portrait-spark" aria-hidden="true">✳</span>
          <figcaption className="about__portrait-caption">
            <span><strong>{profile.name}</strong><small>Creative thinker. Hands-on marketer.</small></span>
            <span className="about__portrait-location">COLOMBO, LK ↗</span>
          </figcaption>
        </figure>

        <div className="stat-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <span className="stat-card__value">{stat.value}</span>
              <span className="stat-card__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
