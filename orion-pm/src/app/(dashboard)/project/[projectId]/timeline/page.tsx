"use client";

import { use, useEffect, useState } from "react";
import { PhaseMock, phasesMock } from "@/mocks/mock";
import ProjectTimeline from "@/components/timeline/ProjectTimeline";

export default function TimelinePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.projectId;

  const [phases, setPhases] = useState<PhaseMock[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const projectPhases = phasesMock
      .filter((project) => project.projectId === projectId)
      .sort((a, b) => a.order - b.order);

    setPhases(projectPhases);
  }, [projectId]);

  if (!isMounted) return null;

  return <ProjectTimeline projectId={projectId} initialPhases={phases} />;
}
