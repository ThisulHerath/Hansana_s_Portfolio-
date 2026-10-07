import { useEffect, useRef, useState } from 'react';

export const SECTION_IDS = ['top', 'about', 'work', 'experience', 'skills', 'achievements', 'contact'];

// Only section changes render React. High-frequency values stay in a ref.
export default function useScrollSection() {
  const [activeSection, setActiveSection] = useState('top');
  const scene = useRef({ section: 'top', progress: 0, scroll: 0, pointer: null, target: null });
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.innerHeight * 0.38;
      let active = 'top';
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= marker) active = id;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scene.current.scroll = window.scrollY;
      scene.current.progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      scene.current.section = active;
      setActiveSection(active);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return { activeSection, scene };
}
