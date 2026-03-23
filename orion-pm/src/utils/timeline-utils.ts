import { SelectOption } from "@/components/ui/select";
import { PhaseMock, PhaseStatus } from "@/mocks/mock";

export type ZoomLevel = "DAY" | "WEEK" | "MONTH";

export function getPixelsPerDay(zoom: ZoomLevel) {
  switch (zoom) {
    case "DAY":
      return 40;
    case "WEEK":
      return 10;
    case "MONTH":
      return 3;
    default:
      return 40;
  }
}

export function getTimelineExtents(phases: PhaseMock[], bufferDays = 15) {
  if (!phases.length) {
    const today = new Date();
    return { minDate: today, maxDate: today, totalDays: 1 };
  }

  const minDate = new Date(
    Math.min(...phases.map((p) => p.startDate.getTime())),
  );
  const maxDate = new Date(Math.max(...phases.map((p) => p.endDate.getTime())));

  minDate.setDate(minDate.getDate() - bufferDays);
  maxDate.setDate(maxDate.getDate() + bufferDays);

  const totalMs = maxDate.getTime() - minDate.getTime();
  const totalDays = Math.max(1, Math.ceil(totalMs / (1000 * 60 * 60 * 24)));
  return { minDate, maxDate, totalDays };
}

export function calculatePhaseGeometryPixels(
  phase: PhaseMock,
  minDate: Date,
  pixelsPerDay: number,
) {
  const startOffsetMs = phase.startDate.getTime() - minDate.getTime();
  const durationMs = phase.endDate.getTime() - phase.startDate.getTime();

  const startDays = startOffsetMs / (1000 * 60 * 60 * 24);
  const durationDays = Math.max(1, durationMs / (1000 * 60 * 60 * 24)); // No mínimo 1 dia de largura

  const left = startDays * pixelsPerDay;
  const width = durationDays * pixelsPerDay;

  return { left: `${left}px`, width: `${width}px` };
}

export function generateTimelineMarkers(
  minDate: Date,
  maxDate: Date,
  zoom: ZoomLevel,
) {
  const markers = [];
  const current = new Date(minDate);
  current.setHours(0, 0, 0, 0);

  if (zoom === "DAY") {
    while (current <= maxDate) {
      markers.push({
        date: new Date(current),
        label: current.toLocaleDateString("en-US", { day: "2-digit" }),
        subLabel: current.toLocaleDateString("en-US", { weekday: "short" }),
        isMajor: current.getDate() === 1,
        majorLabel:
          current.getDate() === 1
            ? current.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : null,
      });
      current.setDate(current.getDate() + 1);
    }
  } else if (zoom === "WEEK") {
    current.setDate(current.getDate() - current.getDay());
    while (current <= maxDate) {
      markers.push({
        date: new Date(current),
        label: current.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        }),
        isMajor: current.getDate() <= 7,
        majorLabel:
          current.getDate() <= 7
            ? current.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : null,
      });
      current.setDate(current.getDate() + 7);
    }
  } else if (zoom === "MONTH") {
    current.setDate(1);
    while (current <= maxDate) {
      markers.push({
        date: new Date(current),
        label: current.toLocaleDateString("en-US", { month: "short" }),
        isMajor: current.getMonth() === 0,
        majorLabel:
          current.getMonth() === 0 ? current.getFullYear().toString() : null,
      });
      current.setMonth(current.getMonth() + 1);
    }
  }
  return markers;
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

export const PHASE_STATUS_OPTIONS: SelectOption[] = [
  {
    value: "PENDING",
    label: "Peding",
    icon: "Flag",
    iconColor: "text-red-icon",
    iconBgColor: "bg-bg-light-red",
    iconSize: 14,
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: "Flag",
    iconColor: "text-yellow-icon",
    iconBgColor: "bg-bg-light-yellow",
    iconSize: 14,
  },
  {
    value: "COMPLETED",
    label: "Completed",
    icon: "Flag",
    iconColor: "text-green-icon",
    iconBgColor: "bg-bg-light-green",
    iconSize: 14,
  },
];
