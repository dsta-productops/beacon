// PLACEHOLDER names and teams. Replace with the real access contact for each tool.
export const ACCESS_CONTACTS = {
  clara: { name: "Mei Lin Tan", team: "ProductOps team" },
  "claude-code": { name: "Daniel Ong", team: "Developer Experience team" },
  prizm: { name: "Sarah Koh", team: "PRIZM design system team" },
  dash: { name: "Ravi Menon", team: "DASH programme support" },
  dynatrace: { name: "Wei Jie Lim", team: "MCC tooling team" },
} as const;

export type ToolSlug = keyof typeof ACCESS_CONTACTS;
