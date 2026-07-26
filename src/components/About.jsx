import { about, stats } from "../data/content";
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
