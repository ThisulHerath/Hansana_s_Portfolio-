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
    const r = radius * (1 + wave * (index % 2 ? 0.17 : 0.1));
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (step === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  if (index % 2 === 1) {
    // Layered highlights stay inside the liquid outline, without expensive blur passes.
    const body = ctx.createLinearGradient(-radius, -radius, radius, radius);
    body.addColorStop(0, `rgba(${rgb},0.18)`);
    body.addColorStop(0.28, `rgba(${rgb},0.6)`);
    body.addColorStop(0.56, `rgba(${rgb},0.12)`);
    body.addColorStop(0.82, `rgba(${rgb},0.38)`);
    body.addColorStop(1, `rgba(${rgb},0.08)`);
    ctx.fillStyle = body;
    ctx.fill();
    ctx.strokeStyle = `rgba(${rgb},0.5)`;
    ctx.stroke();
    ctx.save();
    ctx.clip();
    const shine = ctx.createRadialGradient(-radius * .35, -radius * .5, 0, -radius * .35, -radius * .5, radius * .8);
    shine.addColorStop(0, 'rgba(255,255,255,0.75)');
    shine.addColorStop(.23, 'rgba(255,255,255,0.22)');
    shine.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = shine;
    ctx.fillRect(-radius * 1.3, -radius * 1.3, radius * 2.6, radius * 2.6);
    ctx.beginPath();
    ctx.ellipse(-radius * .23, -radius * .55, radius * .36, radius * .09, -.4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.fill();
    ctx.restore();
    for (let drop = 0; drop < 2; drop++) {
      const angle = shape.phase + drop * 2.2 + time * .15;
      const x = Math.cos(angle) * radius * (1.6 + drop * .2);
      const y = Math.sin(angle) * radius * 1.45;
      const size = radius * (.12 - drop * .035);
      const bead = ctx.createRadialGradient(x - size * .3, y - size * .4, 0, x, y, size);
      bead.addColorStop(0, 'rgba(255,255,255,0.8)');
      bead.addColorStop(.3, `rgba(${rgb},0.5)`);
      bead.addColorStop(1, `rgba(${rgb},0.05)`);
      ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = bead; ctx.fill();
    }
    ctx.restore();
    return;
  }
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
