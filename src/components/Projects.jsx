import { projects } from "../data/content";
import "./Projects.css";

export default function Projects() {
  return (
    <section id="work" className="section projects">
      <div className="container">
        <p className="eyebrow">the portfolio</p>
        <h2 className="section__heading">Campaigns & publications</h2>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <span className="project-card__tag">{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
