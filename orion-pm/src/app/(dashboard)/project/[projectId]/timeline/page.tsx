"use client";

import { Icons } from "@/components/icons";
import { PhaseMock, phasesMock } from "@/mocks/mock";
import {
  calculatePhaseGeometry,
  getTimelineExtents,
  getPhaseStatusStyles,
} from "@/utils/timeline-utils";
import { use, useEffect, useState } from "react";

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

  if (phases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-text-secondary">
        <Icons.Calendar size={48} className="mb-4 opacity-50" />
        <p>No phases or milestones defined for this project.</p>
      </div>
    );
  }

  const { minDate, maxDate, totalDays } = getTimelineExtents(phases);

  return (
    <div className="flex flex-col gap-6 h-full w-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-text-primary">
            Project Timeline
          </h2>
          <p className="text-sm text-text-secondary">
            Gantt chart visualization
          </p>
        </div>
        <button className="flex items-center gap-2 bg-accent-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-sm font-medium">
          <Icons.Add size={16} />
          Add Phase
        </button>
      </div>

      <div className="bg-bg-primary border border-border rounded-xl p-6 flex-1 flex flex-col min-h-100 overflow-x-auto shadow-sm">
        <div className="flex justify-between text-xs text-text-secondary font-medium uppercase tracking-wider border-b border-border pb-2 mb-4">
          <span>{minDate.toLocaleDateString()} (Start)</span>
          <span>{totalDays} total days</span>
          <span>{maxDate.toLocaleDateString()} (End)</span>
        </div>

        <div className="relative flex-1 flex flex-col gap-5 mt-2 overflow-y-auto pr-4">
          <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div
                key={i}
                className="border-l border-dashed border-border h-full"
              ></div>
            ))}
          </div>

          {phases.map((phase) => {
            const geometry = calculatePhaseGeometry(phase, minDate, totalDays);
            const statusStyles = getPhaseStatusStyles(phase.status);

            return (
              <div
                key={phase.id}
                className="relative h-12 w-full flex items-center group"
              >
                <div className="absolute w-full h-px bg-bg-secondary rounded-full opacity-50 z-0"></div>

                <div
                  className={`absolute h-10 rounded-md border flex items-center px-3 shadow-sm transition-transform group-hover:-translate-y-1 cursor-pointer z-10 ${statusStyles}`}
                  style={{
                    left: geometry.left,
                    width: geometry.width,
                  }}
                  title={`Phase: ${phase.name}\nDates: ${phase.startDate.toLocaleDateString()} to ${phase.endDate.toLocaleDateString()}`}
                >
                  <span className="text-sm font-semibold truncate drop-shadow-sm">
                    {phase.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-text-secondary">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-primary"></div>
            <span className="text-text-secondary">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-bg-secondary border border-border"></div>
            <span className="text-text-secondary">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}
