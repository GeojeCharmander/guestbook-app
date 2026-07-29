const CLOUDS = [
  { top: 1, left: -4, w: 260, h: 64 },
  { top: 6, left: 18, w: 340, h: 78 },
  { top: -2, left: 44, w: 300, h: 66 },
  { top: 9, left: 66, w: 260, h: 58 },
  { top: 3, left: 84, w: 220, h: 60 },
];

// Zebras are authored with their feet at local y = 0 and the body rising
// into negative y, so each <use> only needs a translate to its ground spot.
const ZEBRAS = [
  { x: 90, groundY: 355, scale: 0.98, variant: "graze", flip: false },
  { x: 560, groundY: 345, scale: 1.08, variant: "alert", flip: false },
  { x: 628, groundY: 348, scale: 0.9, variant: "graze", flip: true },
  { x: 690, groundY: 344, scale: 0.8, variant: "graze", flip: false },
  { x: 735, groundY: 332, scale: 0.62, variant: "graze", flip: true },
];

export default function Scenery() {
  return (
    <div className="scenery" aria-hidden="true">
      <div className="clouds">
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            className="cloud"
            style={{
              top: `${c.top}%`,
              left: `${c.left}%`,
              width: `${c.w}px`,
              height: `${c.h}px`,
            }}
          />
        ))}
      </div>

      <div className="horizon-scene">
        <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMax slice">
          <defs>
            <radialGradient id="haze" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--sky-a)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--sky-a)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--sun-glow)" />
              <stop offset="100%" stopColor="var(--sun-glow)" stopOpacity="0" />
            </radialGradient>

            {/* shared body + legs, reused by both poses */}
            <g id="zebraBase" fill="var(--grass)">
              <ellipse cx="40" cy="-30" rx="42" ry="14" />
              <rect x="8" y="-16" width="6" height="16" />
              <rect x="22" y="-16" width="6" height="16" />
              <rect x="54" y="-16" width="6" height="16" />
              <rect x="68" y="-16" width="6" height="16" />
            </g>

            {/* grazing: head lowered to the left, tail to the right */}
            <g id="zebraGraze" fill="var(--grass)">
              <use href="#zebraBase" />
              <path
                d="M80,-26 C88,-22 88,-16 84,-12"
                stroke="var(--grass)"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M4,-36 L-18,-16 L-14,-9 L0,-26 Z" />
              <ellipse cx="-15" cy="-9" rx="10" ry="7" />
              <path d="M-20,-14 L-23,-22 L-16,-15 Z" />
            </g>

            {/* alert: head raised to the right, facing the viewer */}
            <g id="zebraAlert" fill="var(--grass)">
              <use href="#zebraBase" />
              <path
                d="M0,-26 C-8,-22 -8,-16 -4,-12"
                stroke="var(--grass)"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M74,-36 L98,-58 L102,-52 L78,-26 Z" />
              <ellipse cx="98" cy="-64" rx="10" ry="8" />
              <path d="M93,-70 L91,-79 L98,-73 Z" />
              <path d="M100,-71 L103,-80 L106,-70 Z" />
            </g>
          </defs>

          <ellipse cx="520" cy="205" rx="480" ry="95" fill="url(#haze)" />

          <circle cx="520" cy="175" r="130" fill="url(#sunGlow)" />
          <circle cx="520" cy="175" r="36" fill="var(--sun-core)" />

          {/* lone acacia tree sitting on the horizon */}
          <g transform="translate(150,236)" fill="var(--grass)">
            <rect x="-3" y="-40" width="6" height="40" />
            <ellipse cx="-15" cy="-52" rx="17" ry="14" />
            <ellipse cx="14" cy="-54" rx="19" ry="15" />
            <ellipse cx="0" cy="-64" rx="16" ry="13" />
          </g>

          {ZEBRAS.map((z, i) => (
            <use
              key={i}
              href={z.variant === "alert" ? "#zebraAlert" : "#zebraGraze"}
              transform={`translate(${z.x} ${z.groundY}) scale(${(z.flip ? -1 : 1) * z.scale} ${z.scale})`}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
