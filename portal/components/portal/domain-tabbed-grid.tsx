"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArtefactGrid, Artefact } from "@/components/portal/artefact-grid";

export function DomainTabbedGrid({
  artefacts,
  numbered = false,
}: {
  artefacts: Artefact[];
  numbered?: boolean;
}) {
  const hasDigital = artefacts.some((a) => a.domain === "digital");
  const hasEngineering = artefacts.some((a) => a.domain === "engineering");

  // If no domain split, fall back to flat grid
  if (!hasDigital || !hasEngineering) {
    return <ArtefactGrid artefacts={artefacts} numbered={numbered} />;
  }

  // Shared artefacts are relevant to both tracks, so they appear in BOTH tabs,
  // keeping their original sequence position within each chain.
  const digital = artefacts.filter(
    (a) => a.domain === "digital" || a.domain === "shared",
  );
  const engineering = artefacts.filter(
    (a) => a.domain === "engineering" || a.domain === "shared",
  );

  return (
    <Tabs defaultValue="digital">
      <TabsList>
        <TabsTrigger value="digital">Digital teams</TabsTrigger>
        <TabsTrigger value="engineering">Engineering teams</TabsTrigger>
      </TabsList>
      <TabsContent value="digital">
        <ArtefactGrid artefacts={digital} numbered={numbered} />
      </TabsContent>
      <TabsContent value="engineering">
        <ArtefactGrid artefacts={engineering} numbered={numbered} />
      </TabsContent>
    </Tabs>
  );
}
