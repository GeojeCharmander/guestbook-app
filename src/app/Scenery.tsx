const BLADES = [
  { left: 3, height: 92, width: 16, dur: 4.2, delay: -0.3, opacity: 0.9 },
  { left: 10, height: 62, width: 12, dur: 3.6, delay: -1.8, opacity: 0.75 },
  { left: 18, height: 110, width: 18, dur: 4.8, delay: -0.9, opacity: 0.95 },
  { left: 27, height: 70, width: 13, dur: 3.9, delay: -2.4, opacity: 0.8 },
  { left: 38, height: 96, width: 16, dur: 4.4, delay: -1.2, opacity: 0.9 },
  { left: 50, height: 130, width: 20, dur: 5.2, delay: -0.5, opacity: 1 },
  { left: 61, height: 80, width: 14, dur: 4, delay: -2.8, opacity: 0.85 },
  { left: 71, height: 104, width: 17, dur: 4.6, delay: -1.5, opacity: 0.92 },
  { left: 82, height: 68, width: 12, dur: 3.7, delay: -0.7, opacity: 0.78 },
  { left: 90, height: 100, width: 16, dur: 4.5, delay: -2, opacity: 0.9 },
  { left: 97, height: 74, width: 13, dur: 3.8, delay: -1, opacity: 0.82 },
];

export default function Scenery() {
  return (
    <div className="scenery" aria-hidden="true">
      {BLADES.map((b, i) => (
        <span
          key={i}
          className="grass"
          style={{
            left: `${b.left}%`,
            height: `${b.height}px`,
            width: `${b.width}px`,
            opacity: b.opacity,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
