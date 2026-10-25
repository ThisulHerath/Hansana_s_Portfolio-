import { useId, useState } from 'react';

export default function ProjectDetails({ children }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`project-details ${open ? 'is-expanded' : ''}`}>
      <button className="project-details__trigger" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)}>
        My contribution <span aria-hidden="true">↗</span>
      </button>
      <div id={id} className="project-details__panel" inert={!open} aria-hidden={!open}>
        <div className="project-details__content"><p>{children}</p></div>
      </div>
    </div>
  );
}
