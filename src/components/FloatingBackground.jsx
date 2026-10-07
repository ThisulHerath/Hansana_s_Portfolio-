import { useEffect, useRef } from 'react';
import { createShape, drawShape, THEMES } from './FloatingShape';
import './FloatingBackground.css';

export default function FloatingBackground({ scene, paused }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const compact = matchMedia('(max-width: 760px), (pointer: coarse)');
    let width, height, shapes, frame = 0, last = 0, time = 0;
    let theme = { ...THEMES.top, color: [...THEMES.top.color] };
    const staticMode = () => paused || reduced.matches;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, compact.matches ? 1 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      shapes = Array.from({ length: compact.matches ? 3 : 6 }, (_, i) => {
        const shape = createShape(i);
        shape.x = width * (i === 0 ? 0.79 : (0.13 + i * 0.19) % 1);
        shape.y = height * (i === 0 ? 0.46 : (0.15 + i * 0.27) % 1);
        return shape;
      });
      restart();
    };
    const draw = (stamp) => {
      frame = 0;
      const dt = Math.min((stamp - (last || stamp)) / 1000, 0.033);
      last = stamp;
      const fixed = staticMode();
      const wanted = THEMES[scene.current.section] || THEMES.top;
      const blend = fixed ? 1 : 1 - Math.exp(-dt * 2);
      theme.color = theme.color.map((c, i) => c + (wanted.color[i] - c) * blend);
      for (const key of ['lobes', 'speed', 'glass']) theme[key] += (wanted[key] - theme[key]) * blend;
      if (!fixed) time += dt * theme.speed;
      ctx.clearRect(0, 0, width, height);
      const targetElement = scene.current.target;
      const box = targetElement?.isConnected ? targetElement.getBoundingClientRect() : null;
      const target = box ? { x: box.left + box.width / 2, y: box.top + box.height / 2 } : scene.current.pointer;
      shapes.forEach((shape, i) => {
        const baseX = width * (i === 0 ? 0.79 : (0.13 + i * 0.19) % 1);
        const baseY = height * (i === 0 ? 0.46 : (0.15 + i * 0.27) % 1);
        let x = baseX + (fixed ? 0 : Math.sin(time + shape.phase) * 28);
        let y = baseY + (fixed ? 0 : Math.cos(time * 0.7 + shape.phase) * 22 - scene.current.progress * 130 * shape.depth);
        let reaction = 0;
        if (target && !fixed) {
          const distance = Math.hypot(target.x - x, target.y - y);
          reaction = Math.max(0, 1 - distance / (box ? 650 : 380));
          const force = box ? 0.22 : -0.12;
          x += (target.x - x) * reaction * force;
          y += (target.y - y) * reaction * force;
        }
        if (fixed) { shape.x = x; shape.y = y; }
        else {
          // Damped spring, integrated in seconds for consistent motion on different refresh rates.
          shape.vx += ((x - shape.x) * 28 - shape.vx * 11) * dt;
          shape.vy += ((y - shape.y) * 28 - shape.vy * 11) * dt;
          shape.x += shape.vx * dt;
          shape.y += shape.vy * dt;
        }
        const radius = i === 0 ? Math.min(width * 0.19, 245) : 22 + i * 10;
        drawShape(ctx, shape, radius, theme, time, i, reaction);
      });
      if (!fixed && !document.hidden) frame = requestAnimationFrame(draw);
    };
    function restart() {
      cancelAnimationFrame(frame);
      last = 0;
      if (!document.hidden) frame = requestAnimationFrame(draw);
    }
    const pointer = (event) => {
      if (staticMode()) return;
      scene.current.pointer = { x: event.clientX, y: event.clientY };
      scene.current.target = event.target instanceof Element ? event.target.closest('[data-float-target]') : null;
    };
    const clear = () => { scene.current.pointer = null; scene.current.target = null; };
    const focus = (event) => { scene.current.target = event.target.closest?.('[data-float-target]') || null; };
    const pointerEnd = (event) => { if (event.pointerType !== 'mouse') clear(); };
    const scroll = () => { if (staticMode()) restart(); };
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('pointermove', pointer, { passive: true });
    window.addEventListener('pointerdown', pointer, { passive: true });
    window.addEventListener('pointerup', pointerEnd);
    window.addEventListener('pointercancel', clear);
    document.documentElement.addEventListener('pointerleave', clear);
    document.addEventListener('focusin', focus);
    document.addEventListener('focusout', clear);
    document.addEventListener('visibilitychange', restart);
    reduced.addEventListener('change', restart);
    compact.addEventListener('change', resize);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('pointermove', pointer);
      window.removeEventListener('pointerdown', pointer);
      window.removeEventListener('pointerup', pointerEnd);
      window.removeEventListener('pointercancel', clear);
      document.documentElement.removeEventListener('pointerleave', clear);
      document.removeEventListener('focusin', focus);
      document.removeEventListener('focusout', clear);
      document.removeEventListener('visibilitychange', restart);
      reduced.removeEventListener('change', restart);
      compact.removeEventListener('change', resize);
      clear();
    };
  }, [scene, paused]);
  return <div className="floating-background" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
