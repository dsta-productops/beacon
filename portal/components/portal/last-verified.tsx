// Placeholder owner and date until a real maintainer is assigned.
const OWNER = "John Lim";
const VERIFIED_ON = "[date to be confirmed]";

export function LastVerified() {
  return (
    <p className="text-xs text-fg-subtle font-normal">
      Last verified: {VERIFIED_ON} | Owner: {OWNER}
    </p>
  );
}
