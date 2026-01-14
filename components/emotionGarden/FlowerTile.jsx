import React from "react";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function FlowerSVG({ kind }) {
  // Simple watercolor-ish SVG flowers (stem + leaves + bloom)
  const cfgByKind = {
    Sunflower: {
      petal: "#f5c542",
      petal2: "#f7d56b",
      center: "#7a4a2a",
      stem: "#3b8f62",
      leaf: "#4fb07a",
      petals: 14,
      bloomR: 22,
      centerR: 12,
    },
    Rose: {
      petal: "#ff4f87",
      petal2: "#ff7aa7",
      center: "#ff2f6f",
      stem: "#2f7f5a",
      leaf: "#46a876",
      petals: 10,
      bloomR: 20,
      centerR: 10,
    },
    Hydrangea: {
      petal: "#b67bff",
      petal2: "#ff77c8",
      center: "#ffd15a",
      stem: "#2f7f5a",
      leaf: "#46a876",
      petals: 18,
      bloomR: 20,
      centerR: 7,
    },
    WhiteLotus: {
      petal: "#ffffff",
      petal2: "#ffe6ee",
      center: "#ffd15a",
      stem: "#2f7f5a",
      leaf: "#46a876",
      petals: 12,
      bloomR: 22,
      centerR: 8,
    },
    PinkLotus: {
      petal: "#ff9fc1",
      petal2: "#ffd0df",
      center: "#ffd15a",
      stem: "#2f7f5a",
      leaf: "#46a876",
      petals: 12,
      bloomR: 22,
      centerR: 8,
    },
    Orchid: {
      petal: "#ff62d8",
      petal2: "#b76bff",
      center: "#ffd15a",
      stem: "#2f7f5a",
      leaf: "#46a876",
      petals: 8,
      bloomR: 22,
      centerR: 8,
    },
    Tulip: {
      petal: "#ff4a5a",
      petal2: "#ff8b94",
      center: "#ff3b4a",
      stem: "#2f7f5a",
      leaf: "#46a876",
      petals: 6,
      bloomR: 20,
      centerR: 6,
    },
    Baby: {
      petal: "#ffffff",
      petal2: "#e7f2ff",
      center: "#ffe6a6",
      stem: "#2f7f5a",
      leaf: "#46a876",
      petals: 10,
      bloomR: 10,
      centerR: 4,
      tiny: true,
    },
    SpecialLotus: {
      petal: "#ffc7dd",
      petal2: "#fff1f6",
      center: "#ffd15a",
      stem: "#2f7f5a",
      leaf: "#46a876",
      petals: 14,
      bloomR: 24,
      centerR: 9,
    },
  };

  const cfg = cfgByKind[kind] || cfgByKind.Sunflower;
  const petals = Array.from({ length: cfg.petals });

  return (
    <svg
      viewBox="0 0 160 260"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <filter id="f-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feBlend in="SourceGraphic" in2="blur" mode="multiply" />
        </filter>
      </defs>

      {/* stem */}
      <path
        d="M80 250 C 78 210, 82 185, 80 150 C 78 120, 76 95, 80 70"
        stroke={cfg.stem}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
        filter="url(#f-soft)"
      />

      {/* leaves */}
      <path
        d="M72 170 C 45 165, 30 145, 40 125 C 55 135, 65 150, 72 170 Z"
        fill={cfg.leaf}
        opacity="0.85"
        filter="url(#f-soft)"
      />
      <path
        d="M88 155 C 115 150, 130 130, 120 112 C 105 120, 95 135, 88 155 Z"
        fill={cfg.leaf}
        opacity="0.8"
        filter="url(#f-soft)"
      />

      {/* bloom */}
      <g transform="translate(80 70)" filter="url(#f-soft)">
        {cfg.tiny ? (
          // Baby's breath cluster
          <>
            {[
              [-26, 0, 0.9],
              [-10, -18, 1.0],
              [12, -10, 0.95],
              [24, 6, 0.9],
              [0, 14, 0.92],
            ].map(([x, y, s], i) => (
              <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
                {Array.from({ length: 6 }).map((_, j) => {
                  const a = (j * Math.PI * 2) / 6;
                  const px = Math.cos(a) * 10;
                  const py = Math.sin(a) * 10;
                  return (
                    <ellipse
                      key={j}
                      cx={px}
                      cy={py}
                      rx="7"
                      ry="10"
                      fill={j % 2 === 0 ? cfg.petal : cfg.petal2}
                      opacity="0.92"
                    />
                  );
                })}
                <circle r={cfg.centerR} fill={cfg.center} opacity="0.9" />
              </g>
            ))}
          </>
        ) : (
          <>
            {petals.map((_, i) => {
              const angle = (i * 360) / cfg.petals;
              return (
                <ellipse
                  key={i}
                  cx="0"
                  cy={-cfg.bloomR}
                  rx={cfg.bloomR * 0.52}
                  ry={cfg.bloomR * 1.05}
                  fill={i % 2 === 0 ? cfg.petal : cfg.petal2}
                  opacity="0.92"
                  transform={`rotate(${angle})`}
                />
              );
            })}
            <circle r={cfg.centerR} fill={cfg.center} opacity="0.92" />
            {kind === "Sunflower" && (
              <circle r={cfg.centerR * 0.55} fill="#5a341e" opacity="0.55" />
            )}
          </>
        )}
      </g>
    </svg>
  );
}

export default function FlowerTile({
  cell,
  isDay,
  onClick,
  showLabel = true,
  className,
}) {
  const kindMap = {
    1: "Sunflower",
    2: "Rose",
    3: "Hydrangea",
    4: "WhiteLotus",
    5: "PinkLotus",
    6: "Orchid",
    7: "Tulip",
    8: "Baby",
    9: "SpecialLotus",
  };
  const kind = kindMap[cell?.id] || "Sunflower";

  return (
    <button
      onClick={onClick}
      className={cx(
        "group relative w-full overflow-hidden rounded-3xl",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        isDay
          ? "focus:ring-slate-900/40 focus:ring-offset-white/40"
          : "focus:ring-white/60 focus:ring-offset-black/40",
        className
      )}
      aria-label={`Bấm vào bông hoa để xem lời chúc: ${cell?.flowerName || ""}`}
    >
      {/* ground */}
      <div
        className={cx(
          "absolute inset-x-0 bottom-0 h-16",
          isDay
            ? "bg-gradient-to-t from-emerald-700/70 via-emerald-600/40 to-transparent"
            : "bg-gradient-to-t from-emerald-900/70 via-emerald-800/35 to-transparent"
        )}
      />

      {/* subtle plot background */}
      <div
        className={cx(
          "absolute inset-0",
          isDay ? "bg-white/25" : "bg-white/8",
          "backdrop-blur-[1px]"
        )}
      />

      {/* flower grows from ground */}
      <div className="absolute inset-x-0 bottom-1 flex items-end justify-center">
        <div
          className={cx(
            "flower-grow h-[230px] w-[160px]",
            "origin-bottom",
            "transition-transform duration-300 ease-out",
            "group-hover:scale-[1.03]"
          )}
        >
          <FlowerSVG kind={kind} />
        </div>
      </div>

      {/* label (optional, show on hover/focus to keep UI clean) */}
      {showLabel && (
        <div
          className={cx(
            "absolute left-4 top-4 flex flex-col items-start gap-1",
            "opacity-0 translate-y-1 transition duration-200",
            "group-hover:opacity-100 group-hover:translate-y-0",
            "group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
          )}
        >
          <span
            className={cx(
              "garden-heading text-base md:text-lg",
              isDay ? "text-slate-900" : "text-white"
            )}
          >
            {cell?.flowerName}
          </span>
          <span
            className={cx(
              "garden-body text-xs",
              isDay ? "text-slate-600" : "text-white/70"
            )}
          >
            Bấm để mở lời chúc
          </span>
        </div>
      )}

      <style jsx>{`
        .flower-grow {
          animation: growUp 750ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }
        @keyframes growUp {
          0% {
            transform: scaleY(0.05) translateY(30px);
            opacity: 0;
          }
          100% {
            transform: scaleY(1) translateY(0);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .flower-grow {
            animation: none;
          }
        }
      `}</style>
    </button>
  );
}


