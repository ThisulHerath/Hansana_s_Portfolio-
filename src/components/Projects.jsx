import { projects } from "../data/content";
import "./Projects.css";

export default function Projects() {
  return (
    <section id="work" className="section projects">
      <div className="container">
        <p className="eyebrow">the portfolio</p>
        <h2 className="section__heading">Campaigns & publications</h2>

        <div className="project-grid">
          {projects.map((project, i) => (
            <article className={`project-card project-card--${i}`} key={project.title} data-float-target>
              <div className="project-cover" aria-hidden="true"><span className="project-cover__index">SELECTED PROJECT / 0{i + 1}</span><span className="project-cover__symbol">{['↗', '?', 'R', '✳'][i]}</span><strong>{['FINORA', 'QUIZZICAL', 'REFLECTIONS', 'ALCHEMY'][i]}</strong><span className="project-cover__caption">{['EVENT IDENTITY · 2025', 'A NIGHT OF BRIGHT IDEAS · 2025', 'WORDS MEET DESIGN · 2025', 'CREATING IMPACT TOGETHER · 2026'][i]}</span></div>
              <div className="project-card__body">
              <span className="project-card__tag">{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <details className="project-details"><summary>My contribution <span aria-hidden="true">↗</span></summary><p>{[
                'Designed event artwork and promotional materials, connecting the concept boards to the visual identity used at the event.',
                'Created the artwork and visual content that brought the campus quiz event to life.',
                'Led the editorial direction and cover-to-cover design, working with the department team through publication and launch.',
                'Supervised and contributed to this Marketing Circle fundraising project as Vice President.'
              ][i]}</p></details>
              </div>
            </article>
          ))}
        </div>
        <p className="project-note">A selection of university projects. Graphic covers are portfolio treatments. Get in touch for more project context.</p>
      </div>
    </section>
  );
}
