"use client";

import { useState } from "react";
import { PhaseMock, WorkItemMock } from "@/mocks/mock";
import { Icons } from "@/components/icons";
import Modal from "@/components/ui/modal";
import EditPhase from "@/components/timeline/EditPhase"; // ← REUSE existing!
import {
  getPhaseDurationDays,
  getPhaseProgress,
  getPhaseItemStats,
  PHASE_STATUS_BADGE,
  getPhasesListSummary,
} from "@/utils/phases-utils";

interface PhasesListProps {
  phases: PhaseMock[];
  workItems: WorkItemMock[];
  projectId: string;
}

export default function PhasesList({
  phases,
  workItems,
  projectId,
}: PhasesListProps) {
  const [selectedPhase, setSelectedPhase] = useState<PhaseMock | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const summary = getPhasesListSummary(phases);

  const summaryCards = [
    {
      label: "Total Phases",
      value: summary.total,
      icon: "List" as const,
      color: "text-text-primary",
    },
    {
      label: "Completed",
      value: summary.completed,
      icon: "Flag" as const,
      color: "text-green-400",
    },
    {
      label: "In Progress",
      value: summary.inProgress,
      icon: "Cycle" as const,
      color: "text-blue-400",
    },
    {
      label: "Pending",
      value: summary.pending,
      icon: "Recent" as const,
      color: "text-neutral-400",
    },
  ];

  const formatDate = (d: Date) =>
    new Date(d).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="grid grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = Icons[card.icon];
          return (
            <div
              key={card.label}
              className="bg-bg-primary rounded-lg border border-border p-4 flex items-center gap-3"
            >
              <div className="p-2 rounded-md bg-bg-secondary">
                {Icon && <Icon size={18} className={card.color} />}
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">
                  {card.value}
                </p>
                <p className="text-xs text-text-secondary">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-bg-primary rounded-lg border border-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text-primary">
            Phase List
          </h2>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 text-xs text-accent-primary hover:opacity-80 transition-opacity"
          >
            <Icons.Add size={14} />
            Add Phase
          </button>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-text-secondary">
              <th className="text-left px-5 py-3 w-10">#</th>
              <th className="text-left px-5 py-3">Phase</th>
              <th className="text-left px-5 py-3">Start Date</th>
              <th className="text-left px-5 py-3">End Date</th>
              <th className="text-left px-5 py-3">Duration</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Progress</th>
              <th className="text-left px-5 py-3">Items</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {phases.map((phase) => {
              const badge = PHASE_STATUS_BADGE[phase.status];
              const progress = getPhaseProgress(phase.id, workItems);
              const stats = getPhaseItemStats(phase.id, workItems);
              const duration = getPhaseDurationDays(phase);

              return (
                <tr
                  key={phase.id}
                  className="border-b border-border last:border-0 hover:bg-bg-secondary/50 transition-colors"
                >
                  <td className="px-5 py-4 text-text-secondary font-mono text-xs">
                    {phase.order}
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-text-primary">
                        {phase.name}
                      </p>
                      {phase.description && (
                        <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                          {phase.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-text-secondary text-xs">
                    {formatDate(phase.startDate)}
                  </td>
                  <td className="px-5 py-4 text-text-secondary text-xs">
                    {formatDate(phase.endDate)}
                  </td>
                  <td className="px-5 py-4 text-text-secondary text-xs">
                    {duration}d
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badge.bg} ${badge.text}`}
                    >
                      {badge.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 min-w-30">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent-primary rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-secondary w-8 text-right">
                        {progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-text-secondary text-xs">
                    {stats.done}/{stats.total}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => {
                        setSelectedPhase(phase);
                        setIsEditOpen(true);
                      }}
                      className="text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <Icons.Settings size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedPhase(null);
        }}
        title="Edit Phase"
        closeOnOverlayClick
        size="md"
      >
        {selectedPhase && (
          <EditPhase
            phase={selectedPhase}
            onClose={() => {
              setIsEditOpen(false);
              setSelectedPhase(null);
            }}
            onSave={(updated) => {
              console.log("Save phase:", updated);
              setIsEditOpen(false);
              setSelectedPhase(null);
            }}
          />
        )}
      </Modal>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="New Phase"
        closeOnOverlayClick
        size="md"
      >
        <EditPhase
          phase={null}
          onClose={() => setIsCreateOpen(false)}
          onSave={(created) => {
            console.log("Create phase:", created);
            setIsCreateOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
