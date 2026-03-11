"use client";
import React from "react";
import type { WizardStepWithDataProps } from "../project-wizard";
import Select, { SelectOption } from "@/components/ui/select";

export function RequirementsStep({
  data,
  updateData,
  next,
  back,
}: WizardStepWithDataProps) {
  const clarityOptions: SelectOption[] = [
    {
      value: "yes",
      label: "Yes",
      icon: "ThumbsUp",
      iconBgColor: "bg-bg-light-green",
      iconColor: "text-green-icon",
    },
    {
      value: "partially",
      label: "Partially",
      icon: "Half",
      iconBgColor: "bg-bg-light-yellow",
      iconColor: "text-yellow-icon",
    },
    {
      value: "no",
      label: "No",
      icon: "ThumbsDown",
      iconBgColor: "bg-bg-light-red",
      iconColor: "text-red-icon",
    },
  ];

  const requirementsOptions: SelectOption[] = [
    {
      value: "functional",
      label: "Functional",
      icon: "Puzzle",
      iconBgColor: "bg-bg-darker",
      iconColor: "text-text-secondary",
    },
    {
      value: "non-functional",
      label: "Non-functional",
      icon: "Project",
      iconBgColor: "bg-bg-darker",
      iconColor: "text-text-secondary",
    },
    {
      value: "both",
      label: "Both",
      icon: "Both",
      iconBgColor: "bg-bg-darker",
      iconColor: "text-text-secondary",
    },
  ];

  const documentationOptions: SelectOption[] = [
    {
      value: "high",
      label: "High",
      icon: "CloudComputer",
      iconBgColor: "bg-bg-light-purple",
      iconColor: "text-purple-icon",
    },
    {
      value: "medium",
      label: "Medium",
      icon: "Book",
      iconBgColor: "bg-bg-light-purple",
      iconColor: "text-purple-icon",
    },
    {
      value: "low",
      label: "Low",
      icon: "Paper",
      iconBgColor: "bg-bg-light-purple",
      iconColor: "text-purple-icon",
    },
  ];

  const dependenciesOptions: SelectOption[] = [
    {
      value: "high",
      label: "High",
      icon: "Warning",
      iconBgColor: "bg-bg-light-blue",
      iconColor: "text-blue-icon",
    },
    {
      value: "medium",
      label: "Medium",
      icon: "Temple",
      iconBgColor: "bg-bg-light-blue",
      iconColor: "text-blue-icon",
    },
    {
      value: "low",
      label: "Low",
      icon: "Clipboard",
      iconBgColor: "bg-bg-light-blue",
      iconColor: "text-blue-icon",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="text-text-secondary">
        <h2 className="text-lg font-normal">3. Requirements and Formality</h2>
      </div>

      {/* ADICIONADO O items-end AQUI EMBAIXO 👇 */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 mb-6 items-end">
        <Select
          label="Does the customer know exactly what they want?"
          options={clarityOptions}
          value={data.clientNeedsClarity || ""}
          onChange={(val) => updateData({ clientNeedsClarity: val })}
        />

        <Select
          label="Predominant type of requirements"
          options={requirementsOptions}
          value={data.requirementsType || ""}
          onChange={(val) => updateData({ requirementsType: val })}
        />

        <Select
          label="Required level of formal documentation"
          options={documentationOptions}
          value={data.documentationLevel || ""}
          onChange={(val) => updateData({ documentationLevel: val })}
        />

        <Select
          label="External dependencies / regulations"
          options={dependenciesOptions}
          value={data.externalDependencies || ""}
          onChange={(val) => updateData({ externalDependencies: val })}
        />
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
