"use client";

import { Icons } from "@/components/icons";
import Modal from "@/components/ui/modal";
import { PhaseMock } from "@/mocks/mock";
import {
  calculatePhaseGeometryPixels,
  getTimelineExtents,
  getPhaseStatusStyles,
  ZoomLevel,
  getPixelsPerDay,
  generateTimelineMarkers,
} from "@/utils/timeline-utils";
import { useEffect, useState, useRef } from "react";
import EditPhase from "./EditPhase"; // Repare que agora importa da mesma pasta
import * as Tooltip from "@radix-ui/react-tooltip";

interface ProjectTimelineProps {
  projectId: string;
  initialPhases: PhaseMock[];
}

export default function ProjectTimeline({
  projectId,
  initialPhases,
}: ProjectTimelineProps) {
  const [phases, setPhases] = useState<PhaseMock[]>(initialPhases);
  const [zoom, setZoom] = useState<ZoomLevel>("WEEK");
  const [selectedPhase, setSelectedPhase] = useState<PhaseMock | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [showScrollHint, setShowScrollHint] = useState(false);
  const [hasInteractedWithHint, setHasInteractedWithHint] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPhases(initialPhases);
  }, [initialPhases]);

  useEffect(() => {
    const hideHint = localStorage.getItem("hideTimelineScrollHint");
    if (hideHint === "true") {
      setHasInteractedWithHint(true);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0 && !e.shiftKey) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  const handleMouseEnterTimeline = () => {
    if (!hasInteractedWithHint) {
      setShowScrollHint(true);
      setHasInteractedWithHint(true);
    }
  };

  const dismissHint = (neverShowAgain: boolean) => {
    setShowScrollHint(false);
    if (neverShowAgain) {
      localStorage.setItem("hideTimelineScrollHint", "true");
    }
  };

  if (phases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-text-secondary">
        <Icons.Calendar size={48} className="mb-4 opacity-50" />
        <p>No phases or milestones defined for this project.</p>
      </div>
    );
  }

  const handleCreatePhase = () => {
    const newPhase: Partial<PhaseMock> = {
      projectId,
      name: "",
      status: "PENDING",
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 15)),
      order: phases.length + 1,
    };
    setSelectedPhase(newPhase as PhaseMock);
    setIsCreating(true);
  };

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
    <>
      <Tooltip.Provider delayDuration={200}>
        <div className="flex flex-col gap-3 h-full w-full relative">
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
              <div className="flex bg-bg-secondary p-1 rounded-md border border-border">
                {(["DAY", "WEEK", "MONTH"] as const).map((z) => (
                  <button
                    key={z}
                    onClick={() => setZoom(z)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors cursor-pointer ${
                      zoom === z
                        ? "bg-bg-primary text-text-primary shadow-sm"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {z.charAt(0) + z.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCreatePhase}
                className="flex items-center gap-2 cursor-pointer bg-accent-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-sm font-medium"
              >
                <Icons.Add size={16} />
                Add Phase
              </button>
            </div>
          </div>

          <div className="bg-bg-primary border border-border rounded-xl flex-1 flex flex-col min-h-125 overflow-hidden shadow-sm relative">
            <div
              ref={scrollContainerRef}
              onMouseEnter={handleMouseEnterTimeline}
              className="overflow-x-auto overflow-y-auto flex-1 w-full relative [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-bg-secondary [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-500 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 transition-colors"
            >
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

                <div className="relative pt-6 px-4 flex flex-col gap-5">
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
                        className="relative h-10 w-full flex items-center"
                      >
                        <div className="absolute w-full h-px bg-bg-secondary opacity-50 z-0"></div>

                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <div
                              onClick={() => setSelectedPhase(phase)}
                              className={`absolute h-9 rounded shadow-sm border flex items-center px-3 transition-transform hover:-translate-y-0.5 cursor-pointer z-10 hover:z-20 ${statusStyles}`}
                              style={{
                                left: geometry.left,
                                width: geometry.width,
                              }}
                            >
                              <span className="text-sm font-semibold truncate drop-shadow-sm whitespace-nowrap block w-full overflow-hidden">
                                {phase.name}
                              </span>
                            </div>
                          </Tooltip.Trigger>

                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="bottom"
                              sideOffset={5}
                              className="z-9999 bg-bg-primary text-text-primary text-xs p-3 rounded-md shadow-xl border border-border whitespace-nowrap animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95"
                            >
                              <p className="font-bold text-sm mb-1">
                                {phase.name}
                              </p>
                              <div className="flex flex-col gap-1 text-text-secondary">
                                <p>
                                  <strong>Start:</strong>{" "}
                                  {phase.startDate.toLocaleDateString()}
                                </p>
                                <p>
                                  <strong>End:</strong>{" "}
                                  {phase.endDate.toLocaleDateString()}
                                </p>
                                <p>
                                  <strong>Status:</strong> {phase.status}
                                </p>
                              </div>
                              <Tooltip.Arrow
                                className="fill-bg-primary"
                                width={12}
                                height={6}
                              />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-bg-primary border-t border-border p-3 flex gap-6 text-xs z-40 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="text-text-secondary font-medium">
                  Completed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-primary"></div>
                <span className="text-text-secondary font-medium">
                  In Progress
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-bg-secondary border border-border"></div>
                <span className="text-text-secondary font-medium">Pending</span>
              </div>
            </div>

            {showScrollHint && (
              <div className="absolute bottom-16 right-4 bg-bg-primary border border-border p-4 rounded-lg shadow-2xl z-50 flex flex-col gap-3 max-w-sm animate-in fade-in slide-in-from-bottom-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-text-primary">
                    💡 <strong>Tip:</strong> You can use your mouse wheel to
                    easily scroll horizontally through the timeline!
                  </p>
                  <button
                    onClick={() => dismissHint(false)}
                    className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  >
                    <Icons.Close size={16} />
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <button
                    onClick={() => dismissHint(true)}
                    className="text-xs text-text-secondary hover:text-text-primary underline cursor-pointer"
                  >
                    Don&apos;t show this again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Tooltip.Provider>

      <Modal
        title={isCreating ? "Create New Phase" : "Edit Phase"}
        isOpen={!!selectedPhase}
        onClose={() => {
          setSelectedPhase(null);
          setIsCreating(false);
        }}
        size="2xl"
        titleSize="text-md"
        padding="p-6"
        closeOnOverlayClick={true}
      >
        {selectedPhase && (
          <EditPhase
            phase={selectedPhase}
            isCreating={isCreating}
            onClose={() => {
              setSelectedPhase(null);
              setIsCreating(false);
            }}
          />
        )}
      </Modal>
    </>
  );
}
