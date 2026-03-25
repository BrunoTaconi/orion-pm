"use client";

import { useState } from "react";
import { ReleaseMock, WorkItemMock } from "@/mocks/mock";
import { Icons } from "@/components/icons";
import Modal from "@/components/ui/modal";
import EditRelease from "./EditRelease";
import {
  getReleaseProgress,
  getReleaseItemStats,
  RELEASE_STATUS_BADGE,
  getReleaseSummary,
} from "@/utils/releases-utils";
import { getTypeDetails, getPriorityDetails } from "@/utils/board-utils";

interface ReleasesHubProps {
  releases: ReleaseMock[];
  workItems: WorkItemMock[];
  projectId: string;
}

export default function ReleasesHub({
  releases,
  workItems,
  projectId,
}: ReleasesHubProps) {
  const [selectedRelease, setSelectedRelease] = useState<ReleaseMock | null>(
    null,
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const summary = getReleaseSummary(releases, workItems);

  const summaryCards = [
    {
      label: "Total Releases",
      value: summary.total,
      icon: "Box" as const,
      color: "text-text-primary",
    },
    {
      label: "Released",
      value: summary.released,
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
      label: "Planned",
      value: summary.planned,
      icon: "Calendar" as const,
      color: "text-neutral-400",
    },
  ];

  const formatDate = (d?: Date) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  const sortedReleases = [...releases].sort((a, b) => {
    const order = { IN_PROGRESS: 0, PLANNED: 1, RELEASED: 2, CANCELLED: 3 };
    return (order[a.status] ?? 9) - (order[b.status] ?? 9);
  });

  return (
    <div className="flex flex-col gap-6 p-2">
      {/* Summary Cards */}
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

      {/* Release List */}
      <div className="bg-bg-primary rounded-lg border border-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text-primary">Releases</h2>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 text-xs text-accent-primary hover:opacity-80 transition-opacity"
          >
            <Icons.Add size={14} />
            New Release
          </button>
        </div>

        <div className="divide-y divide-border">
          {sortedReleases.map((release) => {
            const badge = RELEASE_STATUS_BADGE[release.status];
            const progress = getReleaseProgress(release.id, workItems);
            const stats = getReleaseItemStats(release.id, workItems);
            const isExpanded = expandedId === release.id;
            const releaseItems = workItems.filter(
              (wi) => wi.releaseId === release.id,
            );

            return (
              <div key={release.id}>
                {/* Release Row */}
                <div className="px-5 py-4 hover:bg-bg-secondary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Expand toggle */}
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : release.id)
                      }
                      className="text-text-secondary hover:text-text-primary transition-colors shrink-0"
                    >
                      <Icons.Collapse
                        size={14}
                        className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Version badge */}
                    <span className="font-mono text-xs bg-bg-secondary border border-border px-2 py-0.5 rounded text-text-secondary shrink-0">
                      {release.version}
                    </span>

                    {/* Name + description */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary text-sm">
                        {release.name}
                      </p>
                      {release.description && (
                        <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
                          {release.description}
                        </p>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-2 w-32 shrink-0">
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

                    {/* Item count */}
                    <span className="text-xs text-text-secondary shrink-0 w-20 text-center">
                      {stats.done}/{stats.total} items
                    </span>

                    {/* Target date */}
                    <span className="text-xs text-text-secondary shrink-0 w-24">
                      {formatDate(release.releaseDate)}
                    </span>

                    {/* Status badge */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}
                      />
                      <span className={`text-xs font-medium ${badge.text}`}>
                        {badge.label}
                      </span>
                    </div>

                    {/* Edit */}
                    <button
                      onClick={() => {
                        setSelectedRelease(release);
                        setIsEditOpen(true);
                      }}
                      className="text-text-secondary hover:text-text-primary transition-colors shrink-0 ml-2"
                    >
                      <Icons.Settings size={14} />
                    </button>
                  </div>

                  {/* Release notes (when released) */}
                  {release.releaseNotes && release.status === "RELEASED" && (
                    <div className="mt-2 ml-10 text-xs text-text-secondary italic border-l-2 border-border pl-3">
                      {release.releaseNotes}
                    </div>
                  )}
                </div>

                {/* Expanded: linked work items */}
                {isExpanded && (
                  <div className="bg-bg-secondary/30 border-t border-border px-5 py-3">
                    {releaseItems.length === 0 ? (
                      <p className="text-xs text-text-secondary py-2">
                        No work items linked to this release.
                      </p>
                    ) : (
                      <div className="flex flex-col gap-1.5">
                        {releaseItems.map((wi) => {
                          const typeInfo = getTypeDetails(wi.type);
                          const prioInfo = getPriorityDetails(wi.priority);
                          const isDone = wi.status === "DONE";
                          return (
                            <div
                              key={wi.id}
                              className="flex items-center gap-3 py-1.5 px-3 rounded-md bg-bg-primary border border-border"
                            >
                              <span
                                className={`text-xs ${typeInfo.color} shrink-0`}
                              >
                                {typeInfo.label}
                              </span>
                              <span
                                className={`flex-1 text-xs text-text-primary ${isDone ? "line-through opacity-50" : ""}`}
                              >
                                {wi.title}
                              </span>
                              <span
                                className={`text-xs ${prioInfo.color} shrink-0`}
                              >
                                {wi.priority}
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded shrink-0 ${isDone ? "bg-green-500/15 text-green-400" : "bg-bg-secondary text-text-secondary"}`}
                              >
                                {wi.status.replace("_", " ")}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedRelease(null);
        }}
        title="Edit Release"
        closeOnOverlayClick
        size="lg"
      >
        <EditRelease
          release={selectedRelease}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedRelease(null);
          }}
          onSave={(u) => {
            console.log("Save:", u);
            setIsEditOpen(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="New Release"
        closeOnOverlayClick
        size="lg"
      >
        <EditRelease
          release={null}
          onClose={() => setIsCreateOpen(false)}
          onSave={(c) => {
            console.log("Create:", c);
            setIsCreateOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
