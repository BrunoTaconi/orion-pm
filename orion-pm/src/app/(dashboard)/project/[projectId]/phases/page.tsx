"use client";

import { use } from "react";
import { phasesMock, workItemsMock } from "@/mocks/mock";
import PhasesList from "@/components/phases/phases-list";

export default function PhasesPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);

  const phases = phasesMock
    .filter((p) => p.projectId === projectId)
    .sort((a, b) => a.order - b.order);

  const workItems = workItemsMock.filter((wi) => wi.projectId === projectId);

  return <PhasesList phases={phases} workItems={workItems} projectId={projectId} />;
}
