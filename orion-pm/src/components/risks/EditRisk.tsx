"use client";

import { useEffect, useState } from "react";
import {
  RiskMock,
  RiskStatus,
  RiskCategory,
  RiskResponse,
  usersMock,
} from "@/mocks/mock";
import CustomSelect from "@/components/ui/select";
import {
  RISK_STATUS_OPTIONS,
  RISK_CATEGORY_OPTIONS,
  RISK_RESPONSE_OPTIONS,
  PROBABILITY_OPTIONS,
  IMPACT_OPTIONS,
  getRiskScore,
  getRiskLevel,
  RISK_LEVEL_STYLES,
} from "@/utils/risks-utils";

interface EditRiskProps {
  risk: RiskMock | null;
  onClose: () => void;
  onSave: (risk: Partial<RiskMock>) => void;
}

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "TECHNICAL" as RiskCategory,
  probability: "3",
  impact: "3",
  status: "OPEN" as RiskStatus,
  response: "MITIGATE" as RiskResponse,
  ownerId: "",
  mitigationPlan: "",
  contingencyPlan: "",
  dueDate: "",
};

const getInitialState = (risk: RiskMock | null) => {
  if (!risk) return EMPTY_FORM;

  return {
    title: risk.title,
    description: risk.description,
    category: risk.category,
    probability: String(risk.probability),
    impact: String(risk.impact),
    status: risk.status,
    response: risk.response,
    ownerId: risk.ownerId ?? "",
    mitigationPlan: risk.mitigationPlan ?? "",
    contingencyPlan: risk.contingencyPlan ?? "",
    dueDate: risk.dueDate
      ? new Date(risk.dueDate).toISOString().split("T")[0]
      : "",
  };
};

export default function EditRisk({ risk, onClose, onSave }: EditRiskProps) {
  const [form, setForm] = useState(() => getInitialState(risk));

  const [prevRisk, setPrevRisk] = useState<RiskMock | null>(risk);

  if (risk !== prevRisk) {
    setPrevRisk(risk);
    setForm(getInitialState(risk));
  }

  const update = (key: keyof typeof EMPTY_FORM, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const score = getRiskScore(Number(form.probability), Number(form.impact));
  const level = getRiskLevel(score);
  const levelStyle = RISK_LEVEL_STYLES[level];

  const ownerOptions = usersMock.map((u) => ({ value: u.id, label: u.name }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      probability: Number(form.probability) as 1 | 2 | 3 | 4 | 5,
      impact: Number(form.impact) as 1 | 2 | 3 | 4 | 5,
      dueDate: form.dueDate ? new Date(form.dueDate) : undefined,
      ownerId: form.ownerId || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-md font-medium text-text-primary">Title *</label>
        <input
          className="bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-primary"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Short risk description"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-md font-medium text-text-primary">
          Description
        </label>
        <textarea
          rows={2}
          className="bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-primary resize-none"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="What could go wrong and why?"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <CustomSelect
          label="Category"
          options={RISK_CATEGORY_OPTIONS}
          value={form.category}
          onChange={(v) => update("category", v)}
        />
        <CustomSelect
          label="Status"
          options={RISK_STATUS_OPTIONS}
          value={form.status}
          onChange={(v) => update("status", v)}
        />
      </div>

      <div className="grid grid-cols-3 gap-3 items-end">
        <CustomSelect
          label="Probability"
          options={PROBABILITY_OPTIONS}
          value={form.probability}
          onChange={(v) => update("probability", v)}
        />
        <CustomSelect
          label="Impact"
          options={IMPACT_OPTIONS}
          value={form.impact}
          onChange={(v) => update("impact", v)}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-secondary">
            Risk Score
          </label>
          <div
            className={`flex items-center justify-between rounded-md px-3 py-2 border ${levelStyle.border} ${levelStyle.bg}`}
          >
            <span className={`text-sm font-bold ${levelStyle.text}`}>
              {score}
            </span>
            <span className={`text-sm font-medium ${levelStyle.text}`}>
              {level}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <CustomSelect
          label="Response Strategy"
          options={RISK_RESPONSE_OPTIONS}
          value={form.response}
          onChange={(v) => update("response", v)}
        />
        <CustomSelect
          label="Owner (optional)"
          options={[{ value: "", label: "Unassigned" }, ...ownerOptions]}
          value={form.ownerId}
          onChange={(v) => update("ownerId", v)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-secondary">
          Mitigation Due Date
        </label>
        <input
          type="date"
          className="bg-bg-secondary border border-border rounded-md px-3 py-3 text-sm text-text-primary outline-none focus:border-accent-primary"
          value={form.dueDate}
          onChange={(e) => update("dueDate", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-secondary">
          Mitigation Plan
        </label>
        <textarea
          rows={2}
          className="bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-primary resize-none"
          value={form.mitigationPlan}
          onChange={(e) => update("mitigationPlan", e.target.value)}
          placeholder="How will you reduce the probability or impact?"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-secondary">
          Contingency Plan
        </label>
        <textarea
          rows={2}
          className="bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-primary resize-none"
          value={form.contingencyPlan}
          onChange={(e) => update("contingencyPlan", e.target.value)}
          placeholder="What will you do if the risk actually occurs?"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-border mt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors font-medium cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-accent-primary text-white rounded-md hover:bg-blue-700 font-medium transition-opacity cursor-pointer"
        >
          {risk ? "Save Changes" : "Create Risk"}
        </button>
      </div>
    </form>
  );
}
