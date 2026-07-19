import { useEffect, useRef } from 'react';

export function useLeaves(leavesRef, { fallingLeaves = true, leafCount = 26, energy = 'balanced', mood = 'dusk' }) {
  const rafRef = useRef(null);
  const resizeRef = useRef(null);

  useEffect(() => {
    const c = leavesRef.current;
    if (!c) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (resizeRef.current) window.removeEventListener('resize', resizeRef.current);

    const ctx = c.getContext('2d');
    if (!ctx) return;

    if (!fallingLeaves) {
      ctx.clearRect(0, 0, c.width, c.height);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parent = c.parentElement;

    const resize = () => {
      const r = parent.getBoundingClientRect();
      c.width = Math.max(1, Math.round(r.width * dpr));
      c.height = Math.max(1, Math.round(r.height * dpr));
    };
    resize();
    resizeRef.current = resize;
    window.addEventListener('resize', resize);

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = Math.max(6, Math.min(80, leafCount));
    const speedMul = energy === 'calm' ? 0.5 : energy === 'wild' ? 1.9 : 1;

    const palettes = {
      day:   ['#3FC96E', '#1FA84C', '#E8C34A', '#6FDD94', '#8FE3AE', '#D8E8C4'],
      dusk:  ['#3FC96E', '#1FA84C', '#158A3D', '#E8A317', '#6FDD94', '#C4CEBD'],
      night: ['#1FA84C', '#158A3D', '#0D6E2D', '#6FDD94', '#7FDDE0', '#3F5A52'],
    };
    const cols = palettes[mood] || palettes.dusk;
    const rnd = (a, b) => a + Math.random() * (b - a);

    const leaves = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      s: rnd(7, 15) * dpr,
      vy: rnd(0.02, 0.06) * speedMul,
      sway: rnd(0.03, 0.11) * speedMul,
      phase: rnd(0, Math.PI * 2),
      rot: rnd(0, Math.PI * 2),
      vr: rnd(-0.9, 0.9) * speedMul,
      col: cols[(Math.random() * cols.length) | 0],
      op: rnd(0.35, 0.7),
    }));

    const drawLeaf = (x, y, s, rot, col, op) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = op;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.8, -s * 0.3, s * 0.5, s * 0.85, 0, s);
      ctx.bezierCurveTo(-s * 0.5, s * 0.85, -s * 0.8, -s * 0.3, 0, -s);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = op * 0.85;
      ctx.strokeStyle = 'rgba(255,255,255,0.28)';
      ctx.lineWidth = Math.max(1, s * 0.07);
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.9);
      ctx.lineTo(0, s * 0.9);
      ctx.stroke();
      ctx.restore();
    };

    let last = performance.now();
    const frame = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      for (const l of leaves) {
        if (!reduce) {
          l.y += l.vy * dt;
          l.phase += dt;
          l.rot += l.vr * dt;
          if (l.y > 1.08) { l.y = -0.08; l.x = Math.random(); }
        }
        const px = (l.x + Math.sin(l.phase) * l.sway) * W;
        const py = l.y * H;
        drawLeaf(px, py, l.s, l.rot, l.col, l.op);
      }
      if (!reduce) rafRef.current = requestAnimationFrame(frame);
    };

    if (reduce) frame(last);
    else rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [leavesRef, fallingLeaves, leafCount, energy, mood]);
}
