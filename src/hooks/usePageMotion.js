import { useEffect, useRef } from 'react';

// Content stays visible by default; observers enhance it only as it enters view.
export default function usePageMotion(root, paused) {
  const revealedRef = useRef(new WeakSet());
  useEffect(() => {
    const page = root.current;
    if (!page) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Map();
    const revealed = revealedRef.current;
    let observer;
    const finish = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };
    const reveal = (element, delay = 0) => {
      if (revealed.has(element)) return;
      revealed.add(element);
      const animation = element.animate([
        { opacity: 0, translate: '0 20px' },
        { opacity: 1, translate: '0 0' },
      ], { duration: 680, delay, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' });
      animations.set(element, animation);
      animation.onfinish = () => { animations.delete(element); animation.cancel(); };
    };
    const start = () => {
      finish();
      if (paused || preference.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting);
        visible.forEach((entry, index) => {
          reveal(entry.target, Math.min(index * 65, 195));
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.08 });
      page.querySelectorAll('.hero__meta, .hero__intro > *, .hero__portrait, .hero__bottom, .section .eyebrow, .section h2, .about__paragraph, .stat-card, .marketing-process__heading, .marketing-step, .project-card, .timeline__item, .skills-group, .achievement-list li, .edu-card, .interest-tags, .contact__intro, .contact__actions, .contact__footer').forEach(element => observer.observe(element));
    };
    const focus = event => {
      animations.forEach((animation, element) => {
        if (element.contains(event.target)) { animation.cancel(); animations.delete(element); }
      });
    };
    page.addEventListener('focusin', focus);
    preference.addEventListener('change', start);
    start();
    return () => {
      finish();
      page.removeEventListener('focusin', focus);
      preference.removeEventListener('change', start);
    };
  }, [root, paused]);
}
