import { profile } from "../data/content";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container contact__inner">
        <p className="eyebrow">let's talk</p>
        <h2 className="contact__heading">
          Good ideas start with<br />a conversation.
        </h2>
        <p className="contact__intro">Looking for a marketing intern who brings creative ideas and follows through? I'd love to hear from you.</p>

        <div className="contact__actions">
          <a
            href={`mailto:${profile.email}`}
            className="btn btn--primary"
          >
            Let's talk ↗
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
            download
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            Download resume
          </a>
        </div>

        <footer className="contact__footer">
          <span>{profile.location}</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
        </footer>
        <div className="footer-credit"><a href="#top">HP<span>.</span></a><span>© {new Date().getFullYear()} {profile.name}</span><a href="#top">Back to top ↑</a></div>
      </div>
    </section>
  );
}
