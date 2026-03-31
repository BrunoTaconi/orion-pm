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
      color: "text-white",
      iconBgColor: "bg-blue-500",
    },

    {
      label: "Critical",
      value: summary.critical,
      icon: "Bug" as const,
      color: "text-white",

      iconBgColor: "bg-red-icon",
    },
    {
      label: "Open",
      value: summary.open,
      icon: "Book" as const,
      color: "text-white",

      iconBgColor: "bg-yellow-icon",
    },
    {
      label: "Resolved",
      value: summary.mitigated,
      icon: "Check" as const,
      color: "text-white",

      iconBgColor: "bg-green-icon",
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
    <div className="flex flex-col gap-8 p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          {summaryCards.map((card) => {
            const Icon = Icons[card.icon];
            return (
              <div
                key={card.label}
                className="bg-bg-primary rounded-xl border border-border p-5 flex flex-col justify-center gap-3 shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="flex flex-col pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${card.iconBgColor}`}>
                      {Icon && <Icon size={20} className={card.color} />}
                    </div>
                    <p className="text-md font-medium text-text-secondary">
                      {card.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-text-primary text-center">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-7 bg-bg-primary rounded-xl border border-border p-6 shadow-sm flex flex-col items-center justify-between">
          <div className="w-full flex flex-start mb-6">
            <div>
              <p className="text-lg font-semibold text-text-primary">
                Risk Matrix
              </p>
              <p className="text-sm text-text-secondary mt-1">
                Probability × Impact Distribution
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Eixo Y - Probabilidade */}
            <div className="flex flex-col items-center justify-center gap-1">
              {[5, 4, 3, 2, 1].map((p) => (
                <div
                  key={p}
                  className="h-10 w-6 sm:h-12 flex items-center justify-center text-xs font-medium text-text-secondary"
                >
                  {p}
                </div>
              ))}
              <div
                className="text-xs font-semibold text-text-secondary mt-2 uppercase tracking-wider"
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
                        className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-md shadow-sm flex items-center justify-center cursor-default transition-all hover:scale-105 hover:brightness-110 border border-black/5 ${getMatrixCellColor(
                          rowIdx,
                          colIdx,
                        )}`}
                        title={
                          riskIds.length > 0 ? `${riskIds.length} risk(s)` : ""
                        }
                      >
                        {riskIds.length > 0 && (
                          <span className="text-sm font-bold text-text-primary bg-white/40 px-2 py-0.5 rounded-full shadow-sm">
                            {riskIds.length}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-10 sm:w-12 md:w-14 flex items-center justify-center text-xs font-medium text-text-secondary"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-xs font-semibold text-text-secondary text-center mt-1 uppercase tracking-wider">
                Impact
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 mt-6 pt-5 border-t border-border w-full">
            {(["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const).map((l) => (
              <div key={l} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-sm shadow-sm ${RISK_LEVEL_STYLES[l].bg} border ${RISK_LEVEL_STYLES[l].border}`}
                />
                <span
                  className={`text-xs font-medium ${RISK_LEVEL_STYLES[l].text}`}
                >
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-bg-primary rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-bg-secondary/20">
          <div className="flex items-center gap-4">
            <h2 className="text-base font-semibold text-text-primary">
              Risk Details
            </h2>
            <div className="flex bg-bg-secondary p-1 rounded-md">
              {["ALL", "OPEN", "MITIGATING", "MITIGATED", "CLOSED"].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    filterStatus === s
                      ? "bg-bg-primary text-text-primary shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {s === "ALL"
                    ? "All"
                    : RISK_STATUS_OPTIONS.find((o) => o.value === s)?.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-white bg-accent-primary hover:bg-blue-700 px-2 py-2 rounded-md transition-colors shadow-sm cursor-pointer"
          >
            <Icons.Add size={16} />
            Add Risk
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-text-secondary bg-bg-secondary/30">
                <th className="text-left px-6 py-4 font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-6 py-4 font-medium uppercase tracking-wider">
                  Category
                </th>
                <th className="text-center px-4 py-4 font-medium uppercase tracking-wider">
                  Prob
                </th>
                <th className="text-center px-4 py-4 font-medium uppercase tracking-wider">
                  Imp
                </th>
                <th className="text-center px-4 py-4 font-medium uppercase tracking-wider">
                  Score
                </th>
                <th className="text-left px-6 py-4 font-medium uppercase tracking-wider">
                  Level
                </th>
                <th className="text-left px-6 py-4 font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-4 font-medium uppercase tracking-wider">
                  Due
                </th>
                <th className="px-6 py-4" />
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
                    className="border-b border-border/50 last:border-0 hover:bg-bg-secondary/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-text-primary line-clamp-1">
                        {risk.title}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-text-secondary text-sm">
                      {catOpt?.label}
                    </td>
                    <td className="px-4 py-4 text-center text-text-secondary">
                      {risk.probability}
                    </td>
                    <td className="px-4 py-4 text-center text-text-secondary">
                      {risk.impact}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-sm font-bold ${levelStyle.text}`}>
                        {score}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${levelStyle.bg} ${levelStyle.text} ${levelStyle.border}`}
                      >
                        {level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-bg-secondary text-xs font-medium text-text-secondary border border-border">
                        {statusOpt?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary text-sm whitespace-nowrap">
                      {formatDate(risk.dueDate)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedRisk(risk);
                          setIsEditOpen(true);
                        }}
                        className="p-2 text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 rounded-lg transition-colors cursor-pointer"
                      >
                        <Icons.Settings size={16} />
                      </button>
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
        onClose={() => {
          setIsEditOpen(false);
          setSelectedRisk(null);
        }}
        title="Edit Risk"
        closeOnOverlayClick
        size="xl"
      >
        <EditRisk
          key={selectedRisk ? selectedRisk.id : "new-risk"}
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
        size="xl"
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
