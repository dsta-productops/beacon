"use client";

import { useEffect, useId, useRef, useState } from "react";

const LIGHT = "#F5B544";
const BEAM_LENGTH = 2000;
const BEAM_HALF_ANGLE = 9;
const CORE_HALF_ANGLE = 4.25;

const beamPath = (halfAngle: number) => {
  const spread = BEAM_LENGTH * Math.tan((halfAngle * Math.PI) / 180);
  return `M0 0 L${BEAM_LENGTH} ${-spread} L${BEAM_LENGTH} ${spread} Z`;
};
/** The signed difference between two angles, in (-180, 180]. */
const angleBetween = (a: number, b: number) => ((((a - b) % 360) + 540) % 360) - 180;

/**
 * A small beacon placed at (x, y) in its parent section, with the hero's beam that
 * follows the cursor across the section. Elements in the section marked
 * data-beam-target get data-lit while the beam is on them. Mouse only; at rest
 * (and with reduced motion) the beam holds at restAngle. The parent needs
 * `relative overflow-hidden`, with its content above this in the stacking order.
 */
export function BeaconSpot({ x, y, restAngle }: { x: string; y: string; restAngle: number }) {
  const id = useId().replace(/:/g, "");
  const soften = `${id}-soften`;
  const halo = `${id}-halo`;
  const ref = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(restAngle);

  useEffect(() => {
    const spot = ref.current;
    const section = spot?.parentElement;
    if (!spot || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let current = restAngle;
    let target = restAngle;
    let frame = 0;

    const angleTo = (px: number, py: number) => {
      const box = spot.getBoundingClientRect();
      return (Math.atan2(py - box.top, px - box.left) * 180) / Math.PI;
    };

    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-beam-target]"));
    const lightTargets = () => {
      for (const el of targets) {
        const box = el.getBoundingClientRect();
        const on =
          Math.abs(angleBetween(angleTo(box.left + box.width / 2, box.top + box.height / 2), current)) <=
          BEAM_HALF_ANGLE;
        el.toggleAttribute("data-lit", on);
      }
    };

    const step = () => {
      const delta = angleBetween(target, current);
      current = Math.abs(delta) < 0.05 ? target : current + delta * 0.15;
      setAngle(current);
      lightTargets();
      frame = current === target ? 0 : requestAnimationFrame(step);
    };
    const aimAt = (next: number) => {
      target = next;
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      aimAt(angleTo(event.clientX, event.clientY));
    };
    const onLeave = () => aimAt(restAngle);

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", lightTargets);
    lightTargets();
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", lightTargets);
      cancelAnimationFrame(frame);
      targets.forEach((el) => el.removeAttribute("data-lit"));
    };
  }, [restAngle]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute" style={{ left: x, top: y }}>
      <svg width="1" height="1" className="absolute left-0 top-0 overflow-visible">
        <defs>
          <filter id={soften} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <radialGradient id={halo}>
            <stop offset="0%" stopColor={LIGHT} stopOpacity="0.6" />
            <stop offset="45%" stopColor={LIGHT} stopOpacity="0.3" />
            <stop offset="100%" stopColor={LIGHT} stopOpacity="0" />
          </radialGradient>
        </defs>
        <g fill="none" stroke={LIGHT} strokeWidth="1.5">
          <circle r="50" strokeOpacity="0.2" />
          <circle r="110" strokeOpacity="0.12" />
          <circle r="175" strokeOpacity="0.07" />
        </g>
        <g transform={`rotate(${angle})`}>
          <path d={beamPath(BEAM_HALF_ANGLE)} fill={LIGHT} fillOpacity="0.1" filter={`url(#${soften})`} />
          <path d={beamPath(CORE_HALF_ANGLE)} fill={LIGHT} fillOpacity="0.08" />
        </g>
        <circle r="30" fill={`url(#${halo})`} />
        <circle r="8" fill={LIGHT} />
      </svg>
    </div>
  );
}
