import { ACCESS_CONTACTS, type ToolSlug } from "@/lib/contacts";

export function AccessContact({ tool }: { tool: ToolSlug }) {
  const c = ACCESS_CONTACTS[tool];
  return (
    <p>
      <strong>Stuck?</strong> Contact {c.name} ({c.team}).
    </p>
  );
}
