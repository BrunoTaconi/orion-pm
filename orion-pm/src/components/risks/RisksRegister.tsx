"use client";

import { useState } from "react";
import { RiskMock } from "@/mocks/mock";
import { Icons } from "@/components/icons";
import Modal from "@/components/ui/modal";
import EditRisk from "./EditRisk";
import {
  getRiskScore,
  getRiskLevel,
  RISK_LEVEL_STYLES,
  RISK_STATUS_OPTIONS,
  RISK_CATEGORY_OPTIONS,
  getRiskSummary,
  buildRiskMatrix,
  getMatrixCellColor,
} from "@/utils/risks-utils";

interface RisksRegisterProps {
  risks: RiskMock[];
  projectId: string;
}

export default function RisksRegister({
  risks,
  projectId,
}: RisksRegisterProps) {
  const [selectedRisk, setSelectedRisk] = useState<RiskMock | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const summary = getRiskSummary(risks);
  const matrix = buildRiskMatrix(risks);

  const summaryCards = [
    {
      label: "Total Risks",
      value: summary.total,
      icon: "Warning" as const,
      color: "text-text-primary",
    },
    {
      label: "Open",
      value: summary.open,
      icon: "Flag" as const,
      color: "text-red-400",
    },
    {
      label: "Critical",
      value: summary.critical,
      icon: "Bug" as const,
      color: "text-orange-400",
    },
    {
      label: "Resolved",
      value: summary.mitigated,
      icon: "Half" as const,
      color: "text-green-400",
    },
  ];

  const filteredRisks =
    filterStatus === "ALL"
      ? risks
      : risks.filter((r) => r.status === filterStatus);

  const formatDate = (d?: Date) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        })
      : "—";

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

      <div className="grid grid-cols-[1fr_auto] gap-6 items-start">
        {/* Risk Table */}
        <div className="bg-bg-primary rounded-lg border border-border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold text-text-primary">
                Risk Register
              </h2>
              {/* Status filter pills */}
              <div className="flex gap-1">
                {["ALL", "OPEN", "MITIGATING", "MITIGATED", "CLOSED"].map(
                  (s) => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        filterStatus === s
                          ? "bg-accent-primary text-white"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {s === "ALL"
                        ? "All"
                        : RISK_STATUS_OPTIONS.find((o) => o.value === s)?.label}
                    </button>
                  ),
                )}
              </div>
            </div>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center gap-2 text-xs text-accent-primary hover:opacity-80 transition-opacity"
            >
              <Icons.Add size={14} />
              Add Risk
            </button>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-text-secondary">
                <th className="text-left px-5 py-3">Title</th>
                <th className="text-left px-5 py-3">Category</th>
                <th className="text-center px-4 py-3">P</th>
                <th className="text-center px-4 py-3">I</th>
                <th className="text-center px-4 py-3">Score</th>
                <th className="text-left px-5 py-3">Level</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Due</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filteredRisks.map((risk) => {
                const score = getRiskScore(risk.probability, risk.impact);
                const level = getRiskLevel(score);
                const levelStyle = RISK_LEVEL_STYLES[level];
                const statusOpt = RISK_STATUS_OPTIONS.find(
                  (o) => o.value === risk.status,
                );
                const catOpt = RISK_CATEGORY_OPTIONS.find(
                  (c) => c.value === risk.category,
                );

                return (
                  <tr
                    key={risk.id}
                    className="border-b border-border last:border-0 hover:bg-bg-secondary/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-text-primary line-clamp-1">
                        {risk.title}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-text-secondary text-xs">
                      {catOpt?.label}
                    </td>
                    <td className="px-4 py-4 text-center text-text-secondary text-xs">
                      {risk.probability}
                    </td>
                    <td className="px-4 py-4 text-center text-text-secondary text-xs">
                      {risk.impact}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-sm font-bold ${levelStyle.text}`}>
                        {score}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${levelStyle.bg} ${levelStyle.text} ${levelStyle.border}`}
                      >
                        {level}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-text-secondary">
                        {statusOpt?.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-text-secondary text-xs">
                      {formatDate(risk.dueDate)}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => {
                          setSelectedRisk(risk);
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

        <div className="bg-bg-primary rounded-lg border border-border p-5 w-64 shrink-0">
          <h3 className="text-sm font-semibold text-text-primary mb-1">
            Risk Matrix
          </h3>
          <p className="text-xs text-text-secondary mb-4">
            Probability × Impact
          </p>

          <div className="flex gap-1">
            <div className="flex flex-col items-center justify-center gap-1 mr-1">
              {[5, 4, 3, 2, 1].map((p) => (
                <div
                  key={p}
                  className="h-8 w-4 flex items-center justify-center text-xs text-text-secondary"
                >
                  {p}
                </div>
              ))}
              <div
                className="text-xs text-text-secondary mt-1"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                Prob
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {[4, 3, 2, 1, 0].map((rowIdx) => (
                <div key={rowIdx} className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((colIdx) => {
                    const riskIds = matrix[rowIdx][colIdx];
                    return (
                      <div
                        key={colIdx}
                        className={`h-8 w-8 rounded flex items-center justify-center cursor-default transition-colors ${getMatrixCellColor(rowIdx, colIdx)}`}
                        title={
                          riskIds.length > 0 ? `${riskIds.length} risk(s)` : ""
                        }
                      >
                        {riskIds.length > 0 && (
                          <span className="text-xs font-bold text-text-primary">
                            {riskIds.length}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-4 w-8 flex items-center justify-center text-xs text-text-secondary"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-secondary text-center mt-0.5">
                Impact
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-4 pt-4 border-t border-border">
            {(["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const).map((l) => (
              <div key={l} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-sm ${RISK_LEVEL_STYLES[l].bg} border ${RISK_LEVEL_STYLES[l].border}`}
                />
                <span className={`text-xs ${RISK_LEVEL_STYLES[l].text}`}>
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedRisk(null);
        }}
        title="Edit Risk"
        closeOnOverlayClick
        size="lg"
      >
        <EditRisk
          risk={selectedRisk}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedRisk(null);
          }}
          onSave={(updated) => {
            console.log("Save risk:", updated);
            setIsEditOpen(false);
            setSelectedRisk(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="New Risk"
        closeOnOverlayClick
        size="lg"
      >
        <EditRisk
          risk={null}
          onClose={() => setIsCreateOpen(false)}
          onSave={(created) => {
            console.log("Create risk:", created);
            setIsCreateOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
