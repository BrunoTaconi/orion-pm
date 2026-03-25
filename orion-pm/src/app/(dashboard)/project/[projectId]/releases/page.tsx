"use client";

import { use } from "react";
import { releasesMock, workItemsMock } from "@/mocks/mock";
import ReleasesHub from "@/components/releases/ReleasesHub";

export default function ReleasesPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);

  const releases = releasesMock.filter((r) => r.projectId === projectId);
  const workItems = workItemsMock.filter((wi) => wi.projectId === projectId);

  return <ReleasesHub releases={releases} workItems={workItems} projectId={projectId} />;
}
