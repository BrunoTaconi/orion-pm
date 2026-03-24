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
    bg: "bg-green-500/15",
    text: "text-green-400",
    border: "border-green-500/30",
  },
  MEDIUM: {
    bg: "bg-yellow-500/15",
    text: "text-yellow-400",
    border: "border-yellow-500/30",
  },
  HIGH: {
    bg: "bg-orange-500/15",
    text: "text-orange-400",
    border: "border-orange-500/30",
  },
  CRITICAL: {
    bg: "bg-red-500/15",
    text: "text-red-400",
    border: "border-red-500/30",
  },
};

export const RISK_STATUS_OPTIONS = [
  {
    value: "OPEN",
    label: "Open",
    icon: "Warning" as const,
    iconColor: "text-red-400",
  },
  {
    value: "MITIGATING",
    label: "Mitigating",
    icon: "Cycle" as const,
    iconColor: "text-yellow-400",
  },
  {
    value: "MITIGATED",
    label: "Mitigated",
    icon: "Half" as const,
    iconColor: "text-blue-400",
  },
  {
    value: "CLOSED",
    label: "Closed",
    icon: "Flag" as const,
    iconColor: "text-green-400",
  },
  {
    value: "OCCURRED",
    label: "Occurred",
    icon: "Bug" as const,
    iconColor: "text-orange-400",
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
    LOW: "bg-green-500/20 hover:bg-green-500/35",
    MEDIUM: "bg-yellow-500/20 hover:bg-yellow-500/35",
    HIGH: "bg-orange-500/20 hover:bg-orange-500/35",
    CRITICAL: "bg-red-500/20 hover:bg-red-500/35",
  };
  return map[level];
}
