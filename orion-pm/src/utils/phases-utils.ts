import { PhaseMock, WorkItemMock } from "@/mocks/mock";

export {
  PHASE_STATUS_OPTIONS,
  getPhaseStatusStyles,
} from "@/utils/timeline-utils";

export function getPhaseDurationDays(phase: PhaseMock): number {
  const ms =
    new Date(phase.endDate).getTime() - new Date(phase.startDate).getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function getPhaseProgress(
  phaseId: string,
  workItems: WorkItemMock[],
): number {
  const items = workItems.filter((wi) => wi.phaseId === phaseId);
  if (items.length === 0) return 0;
  const done = items.filter((wi) => wi.status === "DONE").length;
  return Math.round((done / items.length) * 100);
}

export function getPhaseItemStats(phaseId: string, workItems: WorkItemMock[]) {
  const items = workItems.filter((wi) => wi.phaseId === phaseId);
  return {
    total: items.length,
    done: items.filter((wi) => wi.status === "DONE").length,
    inProgress: items.filter((wi) =>
      ["IN_PROGRESS", "IN_REVIEW", "IN_VALIDATION"].includes(wi.status),
    ).length,
    toDo: items.filter((wi) => wi.status === "TO_DO").length,
  };
}

export const PHASE_STATUS_BADGE: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  PENDING: {
    bg: "bg-neutral-500/15",
    text: "text-neutral-500",
    label: "Pending",
  },
  IN_PROGRESS: {
    bg: "bg-bg-light-blue",
    text: "text-blue-icon",
    label: "In Progress",
  },
  COMPLETED: {
    bg: "bg-bg-light-green",
    text: "text-green-icon",
    label: "Completed",
  },
};

export function getPhasesListSummary(phases: PhaseMock[]) {
  return {
    total: phases.length,
    completed: phases.filter((p) => p.status === "COMPLETED").length,
    inProgress: phases.filter((p) => p.status === "IN_PROGRESS").length,
    pending: phases.filter((p) => p.status === "PENDING").length,
  };
}
