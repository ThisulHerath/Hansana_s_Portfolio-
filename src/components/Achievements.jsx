import { achievements, education, interests } from "../data/content";
import "./Achievements.css";

export default function Achievements() {
  return (
    <section id="achievements" className="section achievements">
      <div className="container achievements__grid">
        <div>
          <p className="eyebrow">off the campaign board</p>
          <h2 className="section__heading">Discipline, on and off court</h2>
          <ul className="achievement-list">
            {achievements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="side-col">
          <div className="edu-card">
            <h3>Education</h3>
            {education.map((item) => (
              <div className="edu-item" key={item.title}>
                <span className="edu-item__period">{item.period}</span>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="interest-tags">
            {interests.map((interest) => (
              <span key={interest} className="interest-tag">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
