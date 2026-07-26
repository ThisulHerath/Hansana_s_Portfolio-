import { skillGroups } from "../data/content";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <p className="eyebrow">the toolkit</p>
        <h2 className="section__heading">Skills</h2>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skills-group" key={group.heading}>
              <h3>{group.heading}</h3>
              <div className="skills-tags">
                {group.skills.map((skill) => (
                  <span className="skill-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
