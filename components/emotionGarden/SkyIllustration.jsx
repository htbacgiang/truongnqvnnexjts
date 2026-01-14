import React from "react";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Watercolor-style illustration background (SVG).
 * - mode: "day" | "sunset" | "night"
 * Note: this is intentionally light-weight and self-contained (no assets).
 */
export default function SkyIllustration({ mode = "sunset", className }) {
  const m = mode === "day" || mode === "night" ? mode : "sunset";

  const sky =
    m === "day"
      ? { top: "#bff3ff", mid: "#94e9ff", bot: "#7fd3ff" }
      : m === "sunset"
        ? { top: "#ffd5a6", mid: "#ffb26b", bot: "#ff7aa7" }
        : { top: "#070714", mid: "#0c0c24", bot: "#10103a" };

  const hill =
    m === "day"
      ? { a: "#1e8c63", b: "#1b7c58", c: "#156b4b" }
      : m === "sunset"
        ? { a: "#1a7a56", b: "#166a4c", c: "#125b41" }
        : { a: "#0a2a22", b: "#08241d", c: "#061f18" };

  const mountain =
    m === "day"
      ? { a: "#76d5c7", b: "#5fc7c0" }
      : m === "sunset"
        ? { a: "#7dd2c8", b: "#64c1bd" }
        : { a: "#1a1b3d", b: "#17183a" };

  const flowerSaturation = m === "night" ? 0.65 : 1;
  const flowerBrightness = m === "night" ? 0.78 : 1;
  const flowerOpacity = m === "night" ? 0.85 : 1;

  return (
    <svg
      className={cx("absolute inset-0 h-full w-full", className)}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <style>{`
        /* ========= subtle motion (cloud drift / falling stars) ========= */
        .cloud-layer {
          transform-box: fill-box;
          transform-origin: center;
          animation: cloudDrift 22s ease-in-out infinite alternate;
        }
        .cloud-layer.slow {
          animation-duration: 30s;
          opacity: 0.75;
        }
        .cloud-layer.reverse {
          animation-name: cloudDriftReverse;
          animation-duration: 26s;
          opacity: 0.8;
        }
        @keyframes cloudDrift {
          from {
            transform: translateX(40px);
          }
          to {
            transform: translateX(-120px);
          }
        }
        @keyframes cloudDriftReverse {
          from {
            transform: translateX(-90px);
          }
          to {
            transform: translateX(70px);
          }
        }

        .star-fall {
          transform-box: fill-box;
          transform-origin: center;
        }
        .star-fall .star {
          transform-box: fill-box;
          transform-origin: center;
          animation: starFall var(--d, 4.8s) linear infinite;
          animation-delay: var(--delay, 0s);
        }
        @keyframes starFall {
          0% {
            transform: translate(140px, -220px);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          100% {
            transform: translate(-220px, 660px);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cloud-layer,
          .star-fall .star {
            animation: none !important;
          }
        }
      `}</style>

      <defs>
        <linearGradient id={`sky-${m}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sky.top} />
          <stop offset="55%" stopColor={sky.mid} />
          <stop offset="100%" stopColor={sky.bot} />
        </linearGradient>

        <filter id="wc-noise" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.18 0"
            result="noiseAlpha"
          />
          <feComposite in="noiseAlpha" in2="SourceGraphic" operator="over" />
        </filter>

        <filter id="wc-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feBlend in="SourceGraphic" in2="blur" mode="multiply" />
        </filter>

        <filter id="wc-paper" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
            result="paper"
          />
          <feColorMatrix
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.07 0"
          />
          <feComposite in2="SourceGraphic" operator="over" />
        </filter>

        {/* Simple flower symbol */}
        <g id="wc-flower">
          <circle cx="0" cy="0" r="16" fill="#ffd15a" opacity="0.95" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 10;
            const x = Math.cos(a) * 26;
            const y = Math.sin(a) * 26;
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="18"
                ry="28"
                fill={i % 2 === 0 ? "#ff70b7" : "#ffb44f"}
                opacity="0.92"
                transform={`rotate(${(i * 360) / 10} ${x} ${y})`}
              />
            );
          })}
          <circle cx="0" cy="0" r="9" fill="#ff914d" opacity="0.9" />
        </g>
      </defs>

      {/* Sky */}
      <rect width="1440" height="900" fill={`url(#sky-${m})`} />

      {/* Clouds (day/sunset) */}
      {m !== "night" && (
        <>
          <g className="cloud-layer slow" opacity="0.8" filter="url(#wc-soft)">
            <path
              d="M140 170c40-60 120-60 160 0 60-30 120 0 120 60H70c0-40 30-70 70-60z"
              fill="#ffffff"
            />
            <path
              d="M520 110c28-45 90-45 118 0 40-20 90 0 90 45H455c0-30 22-52 65-45z"
              fill="#ffffff"
              opacity="0.75"
            />
          </g>
          <g className="cloud-layer reverse" opacity="0.75" filter="url(#wc-soft)">
            <path
              d="M990 150c35-55 110-55 145 0 50-25 110 0 110 55H915c0-38 28-65 75-55z"
              fill="#ffffff"
              opacity="0.9"
            />
            <path
              d="M1180 95c22-34 70-34 92 0 32-16 70 0 70 34h-210c0-23 17-40 48-34z"
              fill="#ffffff"
              opacity="0.7"
            />
          </g>
        </>
      )}

      {/* Sun (day/sunset) */}
      {m !== "night" && (
        <g>
          <circle
            cx="760"
            cy="360"
            r="200"
            fill={m === "day" ? "#fff6a8" : "#ffe09a"}
            opacity={m === "day" ? 0.9 : 0.75}
            filter="url(#wc-soft)"
          />
        </g>
      )}

      {/* Moon + stars (night) */}
      {m === "night" && (
        <g>
          <circle cx="1100" cy="200" r="85" fill="#f5f3ff" opacity="0.85" />
          <circle cx="1130" cy="185" r="78" fill={sky.mid} opacity="0.9" />
          <g opacity="0.65">
            {[
              [160, 120],
              [240, 200],
              [360, 150],
              [520, 230],
              [720, 130],
              [840, 210],
              [980, 120],
              [1220, 320],
              [1280, 180],
              [1040, 280],
            ].map(([x, y], idx) => (
              <circle key={idx} cx={x} cy={y} r="2.5" fill="#ffffff" />
            ))}
          </g>
        </g>
      )}

      {/* Mountains */}
      <g opacity="0.95" filter="url(#wc-noise)">
        <path
          d="M120 470 C 260 360, 420 340, 560 470 C 650 400, 760 390, 860 470 C 980 360, 1120 360, 1260 470 L 1440 470 L 1440 650 L 0 650 L 0 470 Z"
          fill={mountain.a}
          opacity="0.65"
        />
        <path
          d="M0 520 C 140 410, 290 390, 430 520 C 540 450, 650 430, 760 520 C 900 420, 1030 430, 1170 520 C 1280 460, 1360 470, 1440 520 L 1440 650 L 0 650 Z"
          fill={mountain.b}
          opacity="0.75"
        />
      </g>

      {/* Hills/field */}
      <g filter="url(#wc-paper)">
        <path
          d="M0 580 C 220 520, 420 560, 640 600 C 820 630, 1040 620, 1240 580 C 1340 560, 1400 565, 1440 580 L 1440 900 L 0 900 Z"
          fill={hill.a}
          opacity="0.92"
        />
        <path
          d="M0 640 C 240 590, 460 650, 690 690 C 900 725, 1120 705, 1340 650 C 1395 635, 1425 635, 1440 640 L 1440 900 L 0 900 Z"
          fill={hill.b}
          opacity="0.92"
        />
        <path
          d="M0 700 C 260 660, 520 735, 760 770 C 980 800, 1210 790, 1440 740 L 1440 900 L 0 900 Z"
          fill={hill.c}
          opacity="0.92"
        />
      </g>

      {/* Flowers band */}
      <g
        opacity={flowerOpacity}
        style={{
          filter: `saturate(${flowerSaturation}) brightness(${flowerBrightness})`,
        }}
      >
        {[
          { x: 140, y: 745, s: 1.0 },
          { x: 280, y: 780, s: 0.85 },
          { x: 420, y: 740, s: 1.25 },
          { x: 600, y: 790, s: 0.95 },
          { x: 760, y: 755, s: 1.15 },
          { x: 920, y: 790, s: 0.9 },
          { x: 1080, y: 750, s: 1.1 },
          { x: 1240, y: 790, s: 0.85 },
        ].map((f, idx) => (
          <g key={idx} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
            <use href="#wc-flower" />
          </g>
        ))}
      </g>

      {/* A few tulip buds (like the reference) */}
      <g opacity={m === "night" ? 0.75 : 0.95} filter="url(#wc-soft)">
        {[
          { x: 520, y: 760, h: 170 },
          { x: 980, y: 770, h: 185 },
          { x: 1200, y: 770, h: 165 },
        ].map((t, idx) => (
          <g key={idx} transform={`translate(${t.x} ${t.y})`}>
            <path d={`M0 0 L 0 ${-t.h}`} stroke="#7ac49c" strokeWidth="10" opacity="0.9" />
            <path
              d={`M0 ${-t.h + 10} C 16 ${-t.h + 10}, 30 ${-t.h + 35}, 0 ${-t.h + 70} C -30 ${-t.h + 35}, -16 ${-t.h + 10}, 0 ${-t.h + 10} Z`}
              fill="#ff4a5a"
              opacity="0.92"
            />
            <path
              d={`M0 ${-t.h * 0.55} C 35 ${-t.h * 0.45}, 45 ${-t.h * 0.3}, 16 ${-t.h * 0.2}`}
              stroke="#5fae83"
              strokeWidth="8"
              fill="none"
              opacity="0.65"
            />
          </g>
        ))}
      </g>

      {/* Subtle vignette to help text readability */}
      <rect
        width="1440"
        height="900"
        fill={
          m === "day"
            ? "rgba(0,0,0,0.08)"
            : m === "sunset"
              ? "rgba(0,0,0,0.18)"
              : "rgba(0,0,0,0.28)"
        }
      />
    </svg>
  );
}


