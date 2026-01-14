import React, { useEffect, useMemo, useRef } from "react";

const COLORS = [
  "#FFFFFF",
  "#FF1493",
  "#00FFFF",
  "#FFD700",
  "#FF69B4",
  "#7B68EE",
  "#00FF00",
  "#FF4500",
  "#BA55D3",
  "#32CD32",
  "#FF6347",
  "#4169E1",
  "#FFB6C1",
  "#00CED1",
  "#FFA500",
  "#DA70D6",
  "#87CEEB",
  "#FF1744",
  "#1E90FF",
  "#FFFF00",
  "#FF00FF",
  "#00FA9A",
  "#F0E68C",
  "#E6E6FA",
  "#FFE4E1",
];

function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function drawGlowStar(ctx, x, y, outerR, innerR, points, color, rotation, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  ctx.globalAlpha = opacity;
  ctx.shadowColor = color;
  ctx.shadowBlur = Math.max(10, outerR * 1.1);

  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (Math.PI * i) / points - Math.PI / 2;
    const px = Math.cos(a) * r;
    const py = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();

  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, outerR);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(0.35, color);
  g.addColorStop(1, color);
  ctx.fillStyle = g;
  ctx.fill();

  ctx.globalAlpha = opacity * 0.85;
  ctx.lineWidth = Math.max(1.2, outerR * 0.14);
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.restore();
}

function createStars(count, w, h) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const size = 2.2 + Math.random() * 4.5;
    const points = [4, 5, 6][Math.floor(Math.random() * 3)];
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size,
      points,
      color: randItem(COLORS),
      speed: 0.25 + Math.random() * 0.85,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      twinklePhase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.35,
    });
  }
  return stars;
}

export default function NightStarfieldCanvas({ active = false, density = 0.000055 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(0);
  const starsRef = useRef([]);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!active || reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(40, Math.floor(w * h * density));
      starsRef.current = createStars(count, w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    let lastT = performance.now();
    const tick = (t) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dt = Math.min(0.05, (t - lastT) / 1000);
      lastT = t;

      ctx.clearRect(0, 0, w, h);

      const stars = starsRef.current;
      for (const s of stars) {
        s.y += s.speed * (60 * dt);
        s.x += s.drift * (60 * dt);
        s.rotation += s.rotationSpeed * (60 * dt);
        s.twinklePhase += 0.06 * (60 * dt);

        if (s.y > h + 40) {
          s.y = -60 - Math.random() * 80;
          s.x = Math.random() * w;
        }
        if (s.x < -60) s.x = w + 60;
        if (s.x > w + 60) s.x = -60;

        const twinkle = 0.55 + Math.sin(s.twinklePhase) * 0.35;
        const scale = 0.85 + Math.sin(s.twinklePhase * 0.5) * 0.18;
        const outerR = s.size * scale;
        const innerR = Math.max(1.2, outerR * 0.42);

        drawGlowStar(
          ctx,
          s.x,
          s.y,
          outerR,
          innerR,
          s.points,
          s.color,
          s.rotation,
          twinkle
        );
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active, reduced, density]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}






















