import { useId } from "react";

const LIGHT = "#F5B544";
const DIM = "#2A3550";
const FIELD = "#2B3F6E";

// The scene as drawn on the 720×540 design canvas. ORIGIN is where the canvas's
// source sat, and anchors the scene on the field; the source itself sits further
// right, with the beam aimed through the lit marker at (540, 270).
const ORIGIN = { x: 108, y: 444 };
const SOURCE = { x: 300, y: 444 };
const BEAM = "M300 444 L720 41 L720 238 Z";
const BEAM_CORE = "M300 444 L720 92 L720 187 Z";

// Dull markers sit outside the beam; lit markers sit inside it.
const dimMarkers = [
  { cx: 404, cy: 132, r: 7, halo: 24 },
  { cx: 580, cy: 96, r: 5, halo: 18 },
  { cx: 560, cy: 402, r: 6, halo: 20 },
];
const litMarkers = [{ cx: 540, cy: 270, r: 6, halo: 14 }];

/**
 * BEACON hero background: a signal whose beam lights up part of a dark field.
 * Fills its box (wide viewBox, sliced to cover); the scene sits in the right half
 * so hero text can sit over the plain field on the left.
 */
export function BeaconHeroArt({
  className,
  anchor = "middle",
  fieldOnly = false,
}: {
  className?: string;
  /** Just the dot field and the beam: no rings, markers or light source. */
  fieldOnly?: boolean;
  /** Which edge to keep when a short box crops the scene; "bottom" keeps the light source. */
  anchor?: "middle" | "bottom";
}) {
  const id = useId().replace(/:/g, "");
  const dim = `${id}-dim`;
  const lit = `${id}-lit`;
  const clip = `${id}-beam`;
  const dimHalo = `${id}-dim-halo`;
  const litHalo = `${id}-lit-halo`;
  const sourceHalo = `${id}-source-halo`;
  const soften = `${id}-soften`;
  // Place the 720×540 scene so its origin lands at (700, 600) on the 1440×720 field.
  const scene = `translate(700 600) scale(1.21) translate(-${ORIGIN.x} -${ORIGIN.y})`;

  return (
    <svg
      viewBox="0 0 1440 720"
      preserveAspectRatio={
        anchor === "bottom" ? "xMidYMax slice" : "xMidYMid slice"
      }
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern id={dim} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="1.3" fill={FIELD} />
        </pattern>
        {/* The grid's dots where the beam falls: same size, lit orange. */}
        <pattern id={lit} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="1.3" fill={LIGHT} />
        </pattern>
        {/* Softens the beam's outer edges so the light fades out to its sides. */}
        <filter id={soften} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        {/* The lit dots show through the beam, fading out to its sides like the light. */}
        <mask id={clip} maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="720">
          <path d={BEAM} transform={scene} fill="white" filter={`url(#${soften})`} />
        </mask>
        {/* Halos fade to nothing at their edge instead of ending in a hard ring. */}
        <radialGradient id={dimHalo}>
          <stop offset="0%" stopColor={DIM} stopOpacity="0.7" />
          <stop offset="45%" stopColor={DIM} stopOpacity="0.4" />
          <stop offset="100%" stopColor={DIM} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={litHalo}>
          <stop offset="0%" stopColor={LIGHT} stopOpacity="0.4" />
          <stop offset="100%" stopColor={LIGHT} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={sourceHalo}>
          <stop offset="0%" stopColor={LIGHT} stopOpacity="0.6" />
          <stop offset="45%" stopColor={LIGHT} stopOpacity="0.3" />
          <stop offset="100%" stopColor={LIGHT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="720" fill={`url(#${dim})`} />
      <g transform={scene}>
        {!fieldOnly && (
          <g fill="none" stroke={LIGHT} strokeWidth="1.5">
            <circle cx={SOURCE.x} cy={SOURCE.y} r="60" strokeOpacity="0.2" />
            <circle cx={SOURCE.x} cy={SOURCE.y} r="130" strokeOpacity="0.12" />
            <circle cx={SOURCE.x} cy={SOURCE.y} r="210" strokeOpacity="0.07" />
          </g>
        )}
        <path d={BEAM} fill={LIGHT} fillOpacity="0.1" filter={`url(#${soften})`} />
        <path d={BEAM_CORE} fill={LIGHT} fillOpacity="0.08" />
      </g>
      <rect
        width="1440"
        height="720"
        fill={`url(#${lit})`}
        fillOpacity="0.55"
        mask={`url(#${clip})`}
      />
      {!fieldOnly && (
        <g transform={scene}>
          {dimMarkers.map((m) => (
            <g key={`${m.cx}-${m.cy}`}>
              <circle
                cx={m.cx}
                cy={m.cy}
                r={m.halo}
                fill={`url(#${dimHalo})`}
              />
              <circle cx={m.cx} cy={m.cy} r={m.r} fill={DIM} />
            </g>
          ))}
          {litMarkers.map((m) => (
            <g key={`${m.cx}-${m.cy}`}>
              <circle
                cx={m.cx}
                cy={m.cy}
                r={m.halo}
                fill={`url(#${litHalo})`}
              />
              <circle cx={m.cx} cy={m.cy} r={m.r} fill={LIGHT} />
            </g>
          ))}
          <circle
            cx={SOURCE.x}
            cy={SOURCE.y}
            r="34"
            fill={`url(#${sourceHalo})`}
          />
          <circle cx={SOURCE.x} cy={SOURCE.y} r="9" fill={LIGHT} />
        </g>
      )}
    </svg>
  );
}
