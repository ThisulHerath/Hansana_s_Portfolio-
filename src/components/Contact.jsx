import { profile } from "../data/content";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container contact__inner">
        <p className="eyebrow">let's talk</p>
        <h2 className="contact__heading">
          Looking for an intern who'll actually pick up the logistics folder.
        </h2>

        <div className="contact__actions">
          <a
            href={`mailto:${profile.email}`}
            className="btn btn--primary"
          >
            Email me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            LinkedIn
          </a>
          <a
            href={profile.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            Download resume
          </a>
        </div>

        <footer className="contact__footer">
          <span>{profile.location}</span>
          <span>{profile.email}</span>
          <span>{profile.phone}</span>
        </footer>
      </div>
    </section>
  );
}
