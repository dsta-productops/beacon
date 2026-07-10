import { readEntry } from "@/lib/content";
import { Markdown } from "@/components/portal/markdown";
import { Card } from "@/components/ui/card";
import { Frame } from "@/components/ui/frame";
import { Stack } from "@/components/ui/stack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/portal/page-header";
import { Target, Palette, Cpu } from "lucide-react";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Product Roles · ProductOps Co-pilot",
};

interface PageFrontmatter {
  title: string;
  eyebrow?: string;
  lede?: string;
}

interface Role {
  icon: typeof Target;
  name: string;
  subtitle: string;
  typicalHolder: string;
  owns: string;
  anchors: string;
  responsibilities: string[];
}

const roles: Role[] = [
  {
    icon: Target,
    name: "Ops PM",
    subtitle: "Product Lead",
    typicalHolder: "Usually the Ops Manager (OM)",
    owns: "Owns the operational problem and mission outcomes.",
    anchors: "Product owners and lead operational users.",
    responsibilities: [
      "Owns problem definition: operational pain points, mission outcomes, stakeholder needs from the user/ops side.",
      "Defines success metrics tied to operational impact, not just delivery.",
      "Prioritises the backlog against operational urgency and resource constraints.",
      "Acts as the voice of the end-user community (operators, ops staff) and translates their workflows into requirements.",
      "Owns relationships with operational stakeholders and sponsors, managing expectations and securing buy-in across the chain of command.",
      "Owns business case and resourcing justification — articulating why the problem is worth solving and what it costs not to.",
      "Validates that proposed solutions (from UX/Tech PM) actually solve the operational problem as framed, not just a plausible adjacent one.",
      "Owns go-live readiness from an operations standpoint: training, rollout, change management, adoption.",
      "Owns post-launch outcome tracking — whether the operational metrics defined upfront actually moved.",
    ],
  },
  {
    icon: Palette,
    name: "UX PM",
    subtitle: "Design Lead",
    typicalHolder: "Usually the UX Architect",
    owns: "Owns the user experience and product value proposition.",
    anchors: "The UX design team.",
    responsibilities: [
      "Owns the experience layer: how the product behaves, feels, and is structured for the user.",
      "Translates ops requirements into interaction models, information architecture, and design specs.",
      "Plans and runs user research — interviews, contextual inquiry, journey mapping — to ground design decisions in observed behaviour rather than assumption.",
      "Produces working reference implementations (front-end and back-end) that let design intent be validated through real interaction, not just static mockups.",
      "Owns iterative design validation — usability testing, A/B testing, design critiques — and uses findings to revise the working artefact before handoff.",
      "Maintains design system / pattern consistency (e.g. PRIZM compliance) and ensures new components extend rather than fragment the system.",
      "Owns interaction and content design decisions: navigation logic, error states, empty states, microcopy, accessibility considerations.",
      "Owns the design-to-handoff package — documenting design rationale, interaction logic, and known limitations so Tech PM can assess hardening scope accurately.",
      "Owns design QA post-build — confirming the hardened / productionised version hasn't drifted from the validated design intent.",
    ],
  },
  {
    icon: Cpu,
    name: "Tech PM",
    subtitle: "Tech Lead",
    typicalHolder: "Usually the Development Programme Manager",
    owns: "Owns technical delivery and solution implementation.",
    anchors: "The development team.",
    responsibilities: [
      "Owns programme management, delivery planning, and dependencies.",
      "Technical authority; provides engineering oversight and technical governance.",
      "Owns system architecture and technical solution design.",
      "Owns architecture review and integration — assessing whether the prototype's approach fits the broader system architecture (data models, APIs, existing services).",
      "Owns non-functional requirements: security, performance, scalability, compliance, and technical quality.",
      "Owns production hardening — closing the gap between working prototype and production-grade: error handling, logging, monitoring, resilience to edge cases.",
      "Owns technical debt accounting — deciding what in a prototype is kept as-is, refactored, or rebuilt.",
      "Owns security and compliance sign-off — pen testing, data handling, classification boundary compliance; not self-certified by whoever built the prototype.",
      "Manages engineering capacity and sequences the path from prototype to maintained product.",
    ],
  },
];

export default async function ProductRolesPage() {
  const entry = await readEntry<PageFrontmatter>("pages", "product-roles");
  if (!entry) notFound();

  const { title, eyebrow, lede } = entry.frontmatter;

  const marker = "## Where the roles map to the Quality Model";
  const [before, after] = entry.body.split(marker);

  return (
    <Frame maxWidth="xl" padding="lg">
      <Stack gap="8" className="py-8">
        <PageHeader eyebrow={eyebrow ?? "Foundation"} title={title} lede={lede} />
        <Markdown>{before}</Markdown>

        <div className="grid gap-4 lg:grid-cols-3">
          {roles.map(({ icon: Icon, name, subtitle, typicalHolder, owns, anchors, responsibilities }) => (
            <Card key={name} className="p-6">
              <Stack gap="4">
                <Stack gap="3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Stack gap="1">
                    <Heading as="h2" size="lg">
                      {name}
                    </Heading>
                    <Text size="sm" variant="muted">
                      {subtitle}
                    </Text>
                    <Text size="xs" variant="muted" className="italic">
                      {typicalHolder}
                    </Text>
                  </Stack>
                  <Text weight="medium">{owns}</Text>
                  <Text size="sm" variant="muted">
                    <span className="font-medium text-fg">Anchors:</span>{" "}
                    {anchors}
                  </Text>
                </Stack>
                <Separator />
                <ul className="list-disc space-y-2 pl-5 text-sm text-fg-muted marker:text-fg-muted">
                  {responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Stack>
            </Card>
          ))}
        </div>

        <Card className="border-dashed p-5">
          <Stack gap="2">
            <Text
              size="xs"
              weight="medium"
              className="uppercase tracking-wide text-fg-muted"
            >
              Coming next
            </Text>
            <Text size="sm" variant="muted">
              How the three roles collaborate through the flywheel — which role
              leads which phase, and where the handoff surfaces are (PRDs,
              prototype repos, architecture reviews, DASH). Draft landing in a
              future iteration; the current page focuses on role accountability.
            </Text>
          </Stack>
        </Card>

        {after && <Markdown>{`${marker}${after}`}</Markdown>}
      </Stack>
    </Frame>
  );
}
