import { experience } from "../data/content";
import "./Experience.css";

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <p className="eyebrow">on the ground</p>
        <h2 className="section__heading">Leadership & experience</h2>

        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline__item" key={item.role}>
              <div className="timeline__period">{item.period}</div>
              <div className="timeline__body">
                <h3>{item.role}</h3>
                <p className="timeline__org">{item.org}</p>
                <ul>
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
