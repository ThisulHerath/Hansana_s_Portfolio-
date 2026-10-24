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
        <div className="marketing-process">
          <div className="marketing-process__heading"><h3>From classroom curiosity to campaign thinking.</h3><span>The mindset I’m building ↗</span></div>
          <div className="marketing-process__steps">
            {[
              ['01 / THE BRIEF', 'Stay curious.', 'Ask who it’s for, what matters to them, and why they should care.'],
              ['02 / THE IDEA', 'Make it connect.', 'Turn an insight into a story, a visual, or a campaign worth noticing.'],
              ['03 / THE REAL WORLD', 'Make it happen.', 'Bring the team together, get the details right, and learn from doing.'],
            ].map(([number, title, text]) => <article className="marketing-step" key={number}><span className="marketing-step__number">{number}</span><h4>{title}</h4><p>{text}</p></article>)}
          </div>
        </div>
      </div>
    </section>
  );
}
