"use client";
import React from "react";
import type { WizardStepWithDataProps } from "../project-wizard";
import Select, { SelectOption } from "@/components/ui/select";

export default function RisksStep({
  data,
  updateData,
  next,
  back,
}: WizardStepWithDataProps) {
  const complexityOptions: SelectOption[] = [
    {
      value: "high",
      label: "High",
      icon: "Brain",
      iconBgColor: "bg-bg-light-purple",
      iconColor: "text-purple-icon",
    },
    {
      value: "medium",
      label: "Medium",
      icon: "Gear",
      iconBgColor: "bg-bg-light-purple",
      iconColor: "text-purple-icon",
    },
    {
      value: "low",
      label: "Low",
      icon: "Tools",
      iconBgColor: "bg-bg-light-purple",
      iconColor: "text-purple-icon",
    },
  ];

  const risksList = [
    { value: "frequent-scope-changes", label: "Frequent scope changes" },
    {
      value: "high-customers-dependence",
      label: "High dependence on customers",
    },
    { value: "inexperienced-team", label: "Inexperienced team" },
    { value: "new-technology", label: "New technology" },
    { value: "tight-deadline", label: "Tight deadline" },
    { value: "regulations", label: "Regulations" },
  ];

  // Garante que é um array, mesmo que comece undefined
  const currentRisks = data.identifiableRisks || [];

  // Função para adicionar ou remover riscos do array (Múltipla escolha)
  const handleRiskToggle = (riskValue: string) => {
    if (currentRisks.includes(riskValue as any)) {
      // 'as any' previne erro de tipagem caso o TS reclame de string vs string[]
      updateData({
        identifiableRisks: (currentRisks as any).filter(
          (r: string) => r !== riskValue,
        ),
      });
    } else {
      updateData({
        identifiableRisks: [...currentRisks, riskValue] as any,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-text-secondary">
        <h2 className="text-lg font-normal">4. Risks and Complexity</h2>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <Select
            label="Technical complexity of the project"
            options={complexityOptions}
            value={data.technicalComplexity || ""}
            onChange={(val) => updateData({ technicalComplexity: val })}
          />

          <div className="flex flex-col gap-2 w-full">
            <label className="text-md font-semibold text-text-primary mb-1">
              Identifiable risks
            </label>
            <div className="flex flex-col gap-3">
              {risksList.map((risk) => (
                <label
                  key={risk.value}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={(currentRisks as any).includes(risk.value)}
                    onChange={() => handleRiskToggle(risk.value)}
                    className="w-4 h-4 text-accent-primary rounded-sm border-gray-300 focus:ring-accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-text-primary group-hover:text-accent-primary transition-colors">
                    {risk.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-md font-semibold text-text-primary mb-1">
            Use of new technology?
          </label>
          <div className="flex flex-col gap-3">
            {[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ].map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="newTech"
                  value={opt.value}
                  checked={data.newTechUse === opt.value}
                  onChange={(e) => updateData({ newTechUse: e.target.value })}
                  className="w-4 h-4 text-accent-primary bg-bg-secondary border-gray-300 focus:ring-accent-primary cursor-pointer"
                />
                <span className="text-md text-text-primary group-hover:text-accent-primary transition-colors">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={back}
          className="p-2 text-text-secondary hover:text-black cursor-pointer transition"
        >
          Back
        </button>
        <button
          onClick={next}
          className="  bg-accent-primary
        text-bg-primary
        py-1
        px-4
        rounded-sm
        cursor-pointer
        hover:bg-blue-700
        transition
        font-medium
        "
        >
          Next
        </button>
      </div>
    </div>
  );
}
