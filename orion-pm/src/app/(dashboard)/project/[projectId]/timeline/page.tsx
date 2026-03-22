"use client";

import { Icons } from "@/components/icons";
import { PhaseMock, phasesMock } from "@/mocks/mock";
import {
  getTimelineExtents,
  getPhaseStatusStyles,
  ZoomLevel,
  getPixelsPerDay,
  generateTimelineMarkers,
  calculatePhaseGeometryPixels,
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
  const [zoom, setZoom] = useState<ZoomLevel>("WEEK");

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

  const pixelsPerDay = getPixelsPerDay(zoom);
  const { minDate, maxDate, totalDays } = getTimelineExtents(phases);
  const totalWidth = totalDays * pixelsPerDay;
  const markers = generateTimelineMarkers(minDate, maxDate, zoom);

  const today = new Date();
  const todayLeft =
    ((today.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)) *
    pixelsPerDay;
  const showToday = today >= minDate && today <= maxDate;

  return (
    <div className="flex flex-col gap-6 h-full w-full">
      {/* Header e Controles */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-text-primary">
            Project Timeline
          </h2>
          <p className="text-sm text-text-secondary">
            Interactive Gantt Visualization
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Controle de Zoom (Segmented Control) */}
          <div className="flex bg-bg-secondary p-1 rounded-md border border-border">
            {(["DAY", "WEEK", "MONTH"] as const).map((z) => (
              <button
                key={z}
                onClick={() => setZoom(z)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
                  zoom === z
                    ? "bg-bg-primary text-text-primary shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {z.charAt(0) + z.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 bg-accent-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-sm font-medium">
            <Icons.Add size={16} />
            Add Phase
          </button>
        </div>
      </div>

      <div className="bg-bg-primary border border-border rounded-xl flex-1 flex flex-col min-h-125 overflow-hidden shadow-sm relative">
        <div className="overflow-x-auto overflow-y-auto flex-1 h-full w-full relative custom-scrollbar pb-10">
          <div
            style={{ width: `${totalWidth}px`, minWidth: "100%" }}
            className="relative h-full"
          >
            <div className="sticky top-0 z-30 flex bg-bg-primary border-b border-border h-14">
              {markers.map((marker) => {
                const left =
                  ((marker.date.getTime() - minDate.getTime()) /
                    (1000 * 60 * 60 * 24)) *
                  pixelsPerDay;
                return (
                  <div
                    key={marker.date.toISOString()}
                    className="absolute flex flex-col justify-end pb-1 border-l border-border h-full pl-2"
                    style={{ left: `${left}px` }}
                  >
                    {marker.majorLabel && (
                      <span className="text-[10px] font-bold text-text-primary whitespace-nowrap mb-0.5">
                        {marker.majorLabel}
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-text-secondary font-medium">
                        {marker.label}
                      </span>
                      {marker.subLabel && (
                        <span className="text-[10px] text-text-secondary/60">
                          {marker.subLabel}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-0 top-14 z-0 pointer-events-none">
              {markers.map((marker) => {
                const left =
                  ((marker.date.getTime() - minDate.getTime()) /
                    (1000 * 60 * 60 * 24)) *
                  pixelsPerDay;
                return (
                  <div
                    key={marker.date.toISOString()}
                    className={`absolute h-full border-l ${marker.isMajor ? "border-border" : "border-dashed border-border/40"}`}
                    style={{ left: `${left}px` }}
                  />
                );
              })}
            </div>

            {showToday && (
              <div
                className="absolute top-0 bottom-0 z-20 w-px bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                style={{ left: `${todayLeft}px` }}
              >
                <div className="bg-red-500 text-white text-[9px] font-bold uppercase px-1 py-0.5 rounded-sm absolute top-1 -translate-x-1/2">
                  Today
                </div>
              </div>
            )}

            <div className="relative z-10 pt-6 px-4 flex flex-col gap-5">
              {phases.map((phase) => {
                const geometry = calculatePhaseGeometryPixels(
                  phase,
                  minDate,
                  pixelsPerDay,
                );
                const statusStyles = getPhaseStatusStyles(phase.status);

                return (
                  <div
                    key={phase.id}
                    className="relative h-10 w-full flex items-center group"
                  >
                    <div className="absolute w-full h-px bg-bg-secondary opacity-50 z-0"></div>

                    <div
                      className={`absolute h-9 rounded shadow-sm border flex items-center px-3 transition-transform hover:-translate-y-0.5 cursor-pointer z-10 overflow-hidden ${statusStyles}`}
                      style={{
                        left: geometry.left,
                        width: geometry.width,
                      }}
                      title={`Phase: ${phase.name}\nDates: ${phase.startDate.toLocaleDateString()} to ${phase.endDate.toLocaleDateString()}`}
                    >
                      <span className="text-sm font-semibold truncate drop-shadow-sm whitespace-nowrap">
                        {phase.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-bg-primary/95 backdrop-blur border-t border-border p-3 flex gap-6 text-xs z-40">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <span className="text-text-secondary font-medium">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-accent-primary"></div>
            <span className="text-text-secondary font-medium">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-bg-secondary border border-border"></div>
            <span className="text-text-secondary font-medium">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}
