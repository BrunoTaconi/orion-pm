"use client";

import { useState } from "react";
import { PhaseMock, WorkItemMock } from "@/mocks/mock";
import { Icons } from "@/components/icons";
import Modal from "@/components/ui/modal";
import EditPhase from "@/components/timeline/EditPhase";
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

export default function PhasesList({ phases, workItems, projectId }: PhasesListProps) {
  const [selectedPhase, setSelectedPhase] = useState<PhaseMock | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const summary = getPhasesListSummary(phases);

  const summaryCards: {
    label: string;
    value: number;
    icon?: keyof typeof Icons;
    color: string;
    iconBgColor?: string;
  }[] = [
    {
      label: "Total Phases",
      value: summary.total,
      color: "text-text-primary",
    },
    {
      label: "Completed",
      value: summary.completed,
      icon: "Check" as const,
      color: "text-white",
      iconBgColor: "bg-green-500",
    },
    {
      label: "In Progress",
      value: summary.inProgress,
      icon: "Tools" as const,
      color: "text-white",
      iconBgColor: "bg-blue-500",
    },
    {
      label: "Pending",
      value: summary.pending,
      icon: "Recent" as const,
      color: "text-white",
      iconBgColor: "bg-gray-300",
    },
  ];

  const formatDate = (d: Date) =>
    new Date(d).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedPhase(null);
  };

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="grid grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon ? Icons[card.icon] : null;
          return (
            <div
              key={card.label}
              className="bg-bg-primary rounded-lg border border-border p-4 flex items-start gap-3 justify-between"
            >
              <div>
                <p className="text-2xl font-bold text-text-primary">{card.value}</p>
                <p className="text-md text-text-secondary">{card.label}</p>
              </div>
              <div className={`p-2 rounded-md ${card.iconBgColor}`}>
                {Icon && <Icon size={14} className={card.color} filled />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-bg-primary rounded-lg border border-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-md font-semibold text-text-primary">Phase List</h2>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 text-sm text-accent-primary hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Icons.Add size={14} />
            Add Phase
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-bg-secondary/40 text-xs uppercase tracking-wider text-text-secondary">
                <th className="text-left px-5 py-3 font-medium w-10">#</th>
                <th className="text-left px-5 py-3 font-medium w-[40%]">Phase</th>
                <th className="text-left px-5 py-3 font-medium whitespace-nowrap">Start Date</th>
                <th className="text-left px-5 py-3 font-medium whitespace-nowrap">End Date</th>
                <th className="text-left px-5 py-3 font-medium whitespace-nowrap">Duration</th>
                <th className="text-left px-5 py-3 font-medium whitespace-nowrap">Status</th>
                <th className="text-left px-5 py-3 font-medium whitespace-nowrap w-36">Progress</th>
                <th className="text-left px-5 py-3 font-medium whitespace-nowrap">Items</th>
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
                    className="border-b border-border last:border-0 hover:bg-bg-secondary/50 transition-colors cursor-pointer group"
                    onClick={() => {
                      setSelectedPhase(phase);
                      setIsEditOpen(true);
                    }}
                  >
                    <td className="px-5 py-4 text-text-secondary text-xs">
                      {phase.order}
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-text-primary text-sm group-hover:text-accent-primary transition-colors">
                          {phase.name}
                        </p>
                        {phase.description && (
                          <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                            {phase.description}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-text-secondary text-sm whitespace-nowrap">
                      {formatDate(phase.startDate)}
                    </td>
                    <td className="px-5 py-4 text-text-secondary text-sm whitespace-nowrap">
                      {formatDate(phase.endDate)}
                    </td>
                    <td className="px-8 py-4 text-text-secondary text-sm whitespace-nowrap">
                      {duration}d
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badge.bg} ${badge.text}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 w-36">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent-primary rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-text-secondary w-8 text-right tabular-nums">
                          {progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-text-secondary text-sm whitespace-nowrap tabular-nums">
                      {stats.done}/{stats.total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        title="Edit Phase"
        closeOnOverlayClick
        size="md"
      >
        {selectedPhase && (
          <EditPhase
            phase={selectedPhase}
            isCreating={false}
            onClose={handleCloseEdit}
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
          isCreating={true}
          onClose={() => setIsCreateOpen(false)}
        />
      </Modal>
    </div>
  );
}
