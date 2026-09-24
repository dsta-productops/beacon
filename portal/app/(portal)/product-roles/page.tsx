import { readEntry } from "@/lib/content";
import { Markdown } from "@/components/portal/markdown";
import { Card } from "@/components/ui/card";
import { Frame } from "@/components/ui/frame";
import { Stack } from "@/components/ui/stack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/portal/page-header";
import { Compass, Palette, Cpu } from "lucide-react";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Product Roles · BEACON",
};

interface PageFrontmatter {
  title: string;
  eyebrow?: string;
  lede?: string;
}

interface Role {
  icon: typeof Compass;
  craft: string;
  owns: string;
  responsibilities: string[];
}

const roles: Role[] = [
  {
    icon: Compass,
    craft: "Product",
    owns: "Vision, strategy, and roadmap.",
    responsibilities: [
      "Owns vision, strategy and roadmap across the product.",
      "Partners the Ops Manager in the two-in-a-box.",
      "Owns the backlog and delivery of one squad.",
      "Runs discovery and prioritisation day to day.",
    ],
  },
  {
    icon: Palette,
    craft: "Design",
    owns: "Experience and research.",
    responsibilities: [
      "Owns the experience and design standards across the product.",
      "Leads research that validates the problem.",
      "Owns the design work of one squad.",
      "Runs research and design day to day.",
    ],
  },
  {
    icon: Cpu,
    craft: "Engineering",
    owns: "Architecture and standards.",
    responsibilities: [
      "Owns architecture and technical standards across squads.",
      "Makes system design trade-offs.",
      "Owns the engineering delivery of one squad.",
      "Runs the team's technical execution.",
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
          {roles.map(({ icon: Icon, craft, owns, responsibilities }) => (
            <Card key={craft} className="p-6">
              <Stack gap="4">
                <Stack gap="3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Stack gap="1">
                    <Heading as="h2" size="lg">
                      {craft}
                    </Heading>
                    <Text size="sm" variant="muted">
                      {owns}
                    </Text>
                  </Stack>
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

        {after && <Markdown>{`${marker}${after}`}</Markdown>}
      </Stack>
    </Frame>
  );
}
