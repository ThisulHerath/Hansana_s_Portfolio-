export const THEMES = {
  top: { color: [211, 245, 108], lobes: 3, speed: 0.42, glass: 0.2 },
  about: { color: [159, 174, 255], lobes: 5, speed: 0.28, glass: 0.12 },
  work: { color: [255, 143, 115], lobes: 4, speed: 0.55, glass: 0.28 },
  experience: { color: [211, 245, 108], lobes: 6, speed: 0.32, glass: 0.16 },
  skills: { color: [123, 217, 206], lobes: 3, speed: 0.5, glass: 0.24 },
  achievements: { color: [193, 158, 242], lobes: 5, speed: 0.35, glass: 0.18 },
  contact: { color: [211, 245, 108], lobes: 3, speed: 0.22, glass: 0.22 },
};

export function createShape(index) {
  return { x: 0, y: 0, vx: 0, vy: 0, phase: index * 2.399, depth: 0.3 + (index % 3) * 0.3 };
}

// A continuous outline makes changing lobe counts morph instead of swapping geometry.
export function drawShape(ctx, shape, radius, theme, time, index, reaction) {
  const rgb = theme.color.map(Math.round).join(',');
  ctx.save();
  ctx.translate(shape.x, shape.y);
  ctx.rotate(time * 0.05 * (index % 2 ? -1 : 1));
  ctx.beginPath();
  for (let step = 0; step <= 96; step++) {
    const angle = step / 96 * Math.PI * 2;
    const waveA = Math.sin(angle * Math.floor(theme.lobes) + time + shape.phase);
    const waveB = Math.sin(angle * Math.ceil(theme.lobes) + time + shape.phase);
    const wave = waveA + (waveB - waveA) * (theme.lobes % 1);
    const r = radius * (1 + wave * 0.1);
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (step === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  const gradient = ctx.createRadialGradient(-radius * 0.35, -radius * 0.4, 0, 0, 0, radius * 1.2);
  gradient.addColorStop(0, `rgba(${rgb},${theme.glass + reaction * 0.08})`);
  gradient.addColorStop(0.6, `rgba(${rgb},0.035)`);
  gradient.addColorStop(1, `rgba(${rgb},0.01)`);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.strokeStyle = `rgba(${rgb},${0.22 + reaction * 0.2})`;
  ctx.lineWidth = 1;
  ctx.stroke();
  for (let ring = 0; ring < 3; ring++) {
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * (0.7 + ring * 0.1), radius * (0.25 + ring * 0.13), time * 0.12 + ring * 0.6, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${rgb},0.14)`;
    ctx.stroke();
  }
  ctx.restore();
}
