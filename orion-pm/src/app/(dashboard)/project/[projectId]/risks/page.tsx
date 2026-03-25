"use client";

import { use } from "react";
import { risksMock } from "@/mocks/mock";
import RisksRegister from "@/components/risks/RisksRegister";

export default function RisksPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);

  const risks = risksMock.filter((r) => r.projectId === projectId);

  return <RisksRegister risks={risks} projectId={projectId} />;
}
