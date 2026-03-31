import { RiskMock } from "@/mocks/mock";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export function getRiskScore(probability: number, impact: number): number {
  return probability * impact;
}

export function getRiskLevel(score: number): RiskLevel {
  if (score <= 6) return "LOW";
  if (score <= 12) return "MEDIUM";
  if (score <= 19) return "HIGH";
  return "CRITICAL";
}

export const RISK_LEVEL_STYLES: Record<
  RiskLevel,
  { bg: string; text: string; border: string }
> = {
  LOW: {
    bg: "bg-green-500/25",
    text: "text-green-500",
    border: "border-green-500/40",
  },
  MEDIUM: {
    bg: "bg-yellow-500/15",
    text: "text-yellow-500",
    border: "border-yellow-500/40",
  },
  HIGH: {
    bg: "bg-orange-500/25",
    text: "text-orange-400",
    border: "border-orange-500/40",
  },
  CRITICAL: {
    bg: "bg-red-500/35",
    text: "text-red-400",
    border: "border-red-500/40",
  },
};

export const RISK_STATUS_OPTIONS = [
  {
    value: "OPEN",
    label: "Open",
    icon: "Book" as const,
    iconColor: "text-white",
    iconBgColor: "bg-blue-icon",
  },
  {
    value: "MITIGATING",
    label: "Mitigating",
    icon: "Cycle" as const,
    iconColor: "text-white",
    iconBgColor: "bg-green-icon",
  },
  {
    value: "MITIGATED",
    label: "Mitigated",
    icon: "Half" as const,
    iconColor: "text-white",
    iconBgColor: "bg-yellow-icon",
  },
  {
    value: "CLOSED",
    label: "Closed",
    icon: "Close" as const,
    iconSize: 18,
    iconColor: "text-white",
    iconBgColor: "bg-purple-icon",
  },
  {
    value: "OCCURRED",
    label: "Occurred",
    icon: "Bug" as const,
    iconColor: "text-white",
    iconBgColor: "bg-red-icon",
  },
];

export const RISK_CATEGORY_OPTIONS = [
  { value: "TECHNICAL", label: "Technical" },
  { value: "SCHEDULE", label: "Schedule" },
  { value: "BUDGET", label: "Budget" },
  { value: "RESOURCE", label: "Resource" },
  { value: "EXTERNAL", label: "External" },
  { value: "COMPLIANCE", label: "Compliance" },
];

export const RISK_RESPONSE_OPTIONS = [
  { value: "AVOID", label: "Avoid" },
  { value: "MITIGATE", label: "Mitigate" },
  { value: "TRANSFER", label: "Transfer" },
  { value: "ACCEPT", label: "Accept" },
];

export const PROBABILITY_OPTIONS = [
  { value: "1", label: "1 — Very Low" },
  { value: "2", label: "2 — Low" },
  { value: "3", label: "3 — Medium" },
  { value: "4", label: "4 — High" },
  { value: "5", label: "5 — Very High" },
];

export const IMPACT_OPTIONS = [
  { value: "1", label: "1 — Negligible" },
  { value: "2", label: "2 — Minor" },
  { value: "3", label: "3 — Moderate" },
  { value: "4", label: "4 — Major" },
  { value: "5", label: "5 — Catastrophic" },
];

export function getRiskSummary(risks: RiskMock[]) {
  return {
    total: risks.length,
    open: risks.filter((r) => r.status === "OPEN").length,
    critical: risks.filter(
      (r) => getRiskLevel(getRiskScore(r.probability, r.impact)) === "CRITICAL",
    ).length,
    mitigated: risks.filter(
      (r) => r.status === "MITIGATED" || r.status === "CLOSED",
    ).length,
  };
}

export function buildRiskMatrix(risks: RiskMock[]): string[][][] {
  const matrix: string[][][] = Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => [] as string[]),
  );
  risks.forEach((r) => {
    matrix[r.probability - 1][r.impact - 1].push(r.id);
  });
  return matrix;
}

export function getMatrixCellColor(row: number, col: number): string {
  const score = (row + 1) * (col + 1);
  const level = getRiskLevel(score);
  const map: Record<RiskLevel, string> = {
    LOW: "bg-green-500/30 hover:bg-green-500/55",
    MEDIUM: "bg-yellow-500/30 hover:bg-yellow-500/55",
    HIGH: "bg-orange-500/30 hover:bg-orange-500/55",
    CRITICAL: "bg-red-500/30 hover:bg-red-500/55",
  };
  return map[level];
}
