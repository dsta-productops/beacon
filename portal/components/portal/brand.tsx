import Link from "next/link";

export function Brand() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 text-fg transition-colors hover:text-accent"
    >
      <BrandMark />
      <span className="text-base font-semibold tracking-tight">
        BEACON
      </span>
    </Link>
  );
}

// Lighthouse on PRIZM's 24px grid: a filled tower, the light above it and two rays.
function BrandMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-accent"
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 21 10 9h4l1.5 12z" fill="currentColor" />
        <path d="M12 2v3.5" />
        <path d="M6.5 21h11" />
        <path d="M17 4.5 20 3M7 4.5 4 3" />
      </g>
    </svg>
  );
}
