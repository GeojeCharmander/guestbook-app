const CLOUDS = [
  { top: 1, left: -4, w: 260, h: 64 },
  { top: 6, left: 18, w: 340, h: 78 },
  { top: -2, left: 44, w: 300, h: 66 },
  { top: 9, left: 66, w: 260, h: 58 },
  { top: 3, left: 84, w: 220, h: 60 },
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
          </defs>

          <ellipse cx="450" cy="215" rx="480" ry="100" fill="url(#haze)" />

          <circle cx="450" cy="178" r="120" fill="url(#sunGlow)" />
          <circle cx="450" cy="178" r="32" fill="var(--sun-core)" />

          {/* distant ridge, hazy and pale near the sun */}
          <path
            d="M0,220 L120,200 L240,215 L360,195 L420,208 L480,192 L540,210 L660,198 L780,215 L900,200 L1000,218 L1000,400 L0,400 Z"
            fill="color-mix(in srgb, var(--grass) 30%, var(--sky-a) 70%)"
          />

          {/* mid ridge */}
          <path
            d="M0,265 L100,240 L200,255 L300,225 L400,245 L500,215 L600,235 L700,210 L800,230 L900,220 L1000,240 L1000,400 L0,400 Z"
            fill="color-mix(in srgb, var(--grass) 60%, var(--sky-b) 40%)"
          />

          {/* near ridge: taller, tree-textured slope on the left tapering to lower hills */}
          <path
            d="M0,270 L20,250 L35,265 L50,240 L65,258 L80,235 L95,252 L115,225 L130,248 L150,230 L170,255 L190,238 L210,262 L230,245 L250,270 L280,290 L320,310 L370,330 L420,345 L480,355 L540,350 L600,358 L660,348 L720,360 L780,352 L840,362 L900,355 L960,365 L1000,360 L1000,400 L0,400 Z"
            fill="var(--grass)"
          />
        </svg>
      </div>
    </div>
  );
}
