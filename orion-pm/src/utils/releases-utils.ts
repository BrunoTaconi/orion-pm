import { ReleaseMock, WorkItemMock } from "@/mocks/mock";

export function getReleaseProgress(
  releaseId: string,
  workItems: WorkItemMock[],
): number {
  const items = workItems.filter((wi) => wi.releaseId === releaseId);
  if (items.length === 0) return 0;
  const done = items.filter((wi) => wi.status === "DONE").length;
  return Math.round((done / items.length) * 100);
}

export function getReleaseItemStats(
  releaseId: string,
  workItems: WorkItemMock[],
) {
  const items = workItems.filter((wi) => wi.releaseId === releaseId);
  return {
    total: items.length,
    done: items.filter((wi) => wi.status === "DONE").length,
    inProgress: items.filter((wi) =>
      ["IN_PROGRESS", "IN_REVIEW", "IN_VALIDATION"].includes(wi.status),
    ).length,
    toDo: items.filter((wi) => wi.status === "TO_DO").length,
  };
}

export const RELEASE_STATUS_BADGE: Record<
  string,
  { bg: string; text: string; label: string; dot: string }
> = {
  PLANNED: {
    bg: "bg-neutral-500/15",
    text: "text-neutral-400",
    dot: "bg-neutral-400",
    label: "Planned",
  },
  IN_PROGRESS: {
    bg: "bg-blue-500/15",
    text: "text-blue-400",
    dot: "bg-blue-400",
    label: "In Progress",
  },
  RELEASED: {
    bg: "bg-green-500/15",
    text: "text-green-400",
    dot: "bg-green-400",
    label: "Released",
  },
  CANCELLED: {
    bg: "bg-red-500/15",
    text: "text-red-400",
    dot: "bg-red-400",
    label: "Cancelled",
  },
};

export const RELEASE_STATUS_OPTIONS = [
  { value: "PLANNED", label: "Planned" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "RELEASED", label: "Released" },
  { value: "CANCELLED", label: "Cancelled" },
];

export function getReleaseSummary(
  releases: ReleaseMock[],
  workItems: WorkItemMock[],
) {
  const totalItems = workItems.filter((wi) =>
    releases.some((r) => r.id === wi.releaseId),
  ).length;

  return {
    total: releases.length,
    released: releases.filter((r) => r.status === "RELEASED").length,
    inProgress: releases.filter((r) => r.status === "IN_PROGRESS").length,
    planned: releases.filter((r) => r.status === "PLANNED").length,
    totalItems,
  };
}
