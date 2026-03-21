import { PhaseMock, PhaseStatus } from "@/mocks/mock";

export function getTimelineExtents(phases: PhaseMock[]) {
  if (!phases.length) {
    return { minDate: new Date(), maxDate: new Date(), totalDays: 1 };
  }

  const minDate = new Date(
    Math.min(...phases.map((phase) => phase.startDate.getTime())),
  );
  const maxDate = new Date(
    Math.max(...phases.map((phase) => phase.endDate.getTime())),
  );

  const totalMs = maxDate.getTime() - minDate.getTime();
  const totalDays = Math.max(1, Math.ceil(totalMs / (1000 * 60 * 60 * 24)));
  return { minDate, maxDate, totalDays };
}

export function calculatePhaseGeometry(
  phase: PhaseMock,
  minDate: Date,
  totalDays: number,
) {
  const startOffsetMs = phase.startDate.getTime() - minDate.getTime();
  const durationMs = phase.endDate.getTime() - phase.startDate.getTime();

  const startDays = startOffsetMs / (1000 * 60 * 60 * 24);
  const durationDays = durationMs / (1000 * 60 * 60 * 24);

  const left = (startDays / totalDays) * 100;

  const width = Math.max(1, (durationDays / totalDays) * 100);

  return { left: `${left}`, width: `${width}` };
}

export function getPhaseStatusStyles(status: PhaseStatus) {
  switch (status) {
    case "COMPLETED":
      return "bg-green-500 border-green-600 text-white";
    case "IN_PROGRESS":
      return "bg-accent-primary border-blue-600 text-white";
    case "PENDING":
      return "bg-bg-secondary border-border text-text-secondary";
    default:
      return "bg-gray-200 border-gray-300 text-gray-800";
  }
}
