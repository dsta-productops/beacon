"use client";

import { useEffect, useId, useRef, useState } from "react";

const LIGHT = "#F5B544";
const DIM = "#2A3550";
const FIELD = "#2B3F6E";

// The scene as drawn on the 720×540 design canvas. ORIGIN is where the canvas's
// source sat, and anchors the scene on the field; the source itself sits further right.
const ORIGIN = { x: 108, y: 444 };
const SOURCE = { x: 300, y: 444 };

// The beam, drawn pointing along +x from the source and rotated to its angle.
const BEAM_LENGTH = 1200;
const BEAM_HALF_ANGLE = 9; // degrees either side of the beam's centre line
const CORE_HALF_ANGLE = 4.25;
const beamPath = (halfAngle: number) => {
  const spread = BEAM_LENGTH * Math.tan((halfAngle * Math.PI) / 180);
  return `M${SOURCE.x} ${SOURCE.y} L${SOURCE.x + BEAM_LENGTH} ${SOURCE.y - spread} L${SOURCE.x + BEAM_LENGTH} ${SOURCE.y + spread} Z`;
};
const BEAM = beamPath(BEAM_HALF_ANGLE);
const BEAM_CORE = beamPath(CORE_HALF_ANGLE);

// The markers the beam can light. At rest the beam is aimed at the first one.
const markers = [
  { cx: 540, cy: 270, r: 6, halo: 14 },
  { cx: 404, cy: 132, r: 7, halo: 24 },
  { cx: 580, cy: 96, r: 5, halo: 18 },
  { cx: 560, cy: 402, r: 6, halo: 20 },
];

const angleTo = (x: number, y: number) =>
  (Math.atan2(y - SOURCE.y, x - SOURCE.x) * 180) / Math.PI;
const REST_ANGLE = angleTo(markers[0].cx, markers[0].cy);
/** The signed difference between two angles, in (-180, 180]. */
const angleBetween = (a: number, b: number) => ((((a - b) % 360) + 540) % 360) - 180;
const isLit = (m: (typeof markers)[number], beamAngle: number) =>
  Math.abs(angleBetween(angleTo(m.cx, m.cy), beamAngle)) <= BEAM_HALF_ANGLE;

/**
 * BEACON hero background: a signal whose beam lights up part of a dark field.
 * On a pointer device the beam follows the cursor across its section, and a marker
 * glows only while the beam is on it; at rest (and with reduced motion) the beam
 * holds on the first marker. Fills its box (wide viewBox, sliced to cover).
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

  const svgRef = useRef<SVGSVGElement>(null);
  const sceneRef = useRef<SVGGElement>(null);
  const [angle, setAngle] = useState(REST_ANGLE);

  // Follow the cursor: ease the beam towards it each frame, and back to rest when it leaves.
  useEffect(() => {
    const svg = svgRef.current;
    const section = svg?.parentElement;
    if (!svg || !section || fieldOnly) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let current = REST_ANGLE;
    let target = REST_ANGLE;
    let frame = 0;

    const step = () => {
      const delta = angleBetween(target, current);
      current = Math.abs(delta) < 0.05 ? target : current + delta * 0.15;
      setAngle(current);
      frame = current === target ? 0 : requestAnimationFrame(step);
    };
    const aimAt = (next: number) => {
      target = next;
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const matrix = sceneRef.current?.getScreenCTM();
      if (!matrix) return;
      const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
      aimAt(angleTo(point.x, point.y));
    };
    const onLeave = () => aimAt(REST_ANGLE);

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [fieldOnly]);

  const rotate = `rotate(${angle} ${SOURCE.x} ${SOURCE.y})`;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1440 720"
      preserveAspectRatio={anchor === "bottom" ? "xMidYMax slice" : "xMidYMid slice"}
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
          <path d={BEAM} transform={`${scene} ${rotate}`} fill="white" filter={`url(#${soften})`} />
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
      <g ref={sceneRef} transform={scene}>
        {!fieldOnly && (
          <g fill="none" stroke={LIGHT} strokeWidth="1.5">
            <circle cx={SOURCE.x} cy={SOURCE.y} r="60" strokeOpacity="0.2" />
            <circle cx={SOURCE.x} cy={SOURCE.y} r="130" strokeOpacity="0.12" />
            <circle cx={SOURCE.x} cy={SOURCE.y} r="210" strokeOpacity="0.07" />
          </g>
        )}
        <g transform={rotate}>
          <path d={BEAM} fill={LIGHT} fillOpacity="0.1" filter={`url(#${soften})`} />
          <path d={BEAM_CORE} fill={LIGHT} fillOpacity="0.08" />
        </g>
      </g>
      <rect width="1440" height="720" fill={`url(#${lit})`} fillOpacity="0.55" mask={`url(#${clip})`} />
      {!fieldOnly && (
        <g transform={scene}>
          {markers.map((m) => {
            const on = isLit(m, angle);
            return (
              <g key={`${m.cx}-${m.cy}`}>
                <circle cx={m.cx} cy={m.cy} r={on ? 14 : m.halo} fill={`url(#${on ? litHalo : dimHalo})`} />
                <circle cx={m.cx} cy={m.cy} r={m.r} fill={on ? LIGHT : DIM} />
              </g>
            );
          })}
          <circle cx={SOURCE.x} cy={SOURCE.y} r="34" fill={`url(#${sourceHalo})`} />
          <circle cx={SOURCE.x} cy={SOURCE.y} r="9" fill={LIGHT} />
        </g>
      )}
    </svg>
  );
}
