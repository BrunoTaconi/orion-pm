"use client";
import Select, { SelectOption } from "@/components/ui/select";
import type { WizardStepWithDataProps } from "../project-wizard";

export default function ProjectProfileStep({
  data,
  updateData,
  next,
  back,
}: WizardStepWithDataProps) {
  const scopeOptions: SelectOption[] = [
    {
      value: "clear",
      label: "Well defined",
      icon: "Sun",
      iconBgColor: "bg-bg-light-green",
      iconColor: "text-green-icon",
    },
    {
      value: "partial",
      label: "Partially defined",
      icon: "SunPartial",
      iconBgColor: "bg-bg-light-yellow",
      iconColor: "text-yellow-icon",
    },
    {
      value: "undefined",
      label: "Still not defined",
      icon: "Question",
      iconBgColor: "bg-bg-light-red",
      iconColor: "text-red-icon",
    },
  ];

  const urgencyOptions: SelectOption[] = [
    {
      value: "high",
      label: "High",
      icon: "Warning",
      iconBgColor: "bg-bg-light-red",
      iconColor: "text-red-icon",
    },
    {
      value: "medium",
      label: "Medium",
      icon: "Warning",
      iconBgColor: "bg-bg-light-yellow",
      iconColor: "text-yellow-icon",
    },
    {
      value: "low",
      label: "Low",
      icon: "Warning",
      iconBgColor: "bg-bg-light-green",
      iconColor: "text-green-icon",
    },
  ];

  const getStabilitySliderValue = () => {
    if ((data as any)._stabilityVisual) return (data as any)._stabilityVisual;
    if (data.stability === "pretty-stable") return 1;
    if (data.stability === "always-changing") return 5;
    return 3;
  };

  const handleStabilityChange = (val: number) => {
    updateData({
      stability:
        val <= 2 ? "pretty-stable" : val >= 4 ? "always-changing" : undefined,
      _stabilityVisual: val,
    } as any);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-text-secondary">
        <h2 className="text-lg font-normal">1. Project Profile</h2>
      </div>

      <Select
        label="How clear is the scope?"
        options={scopeOptions}
        value={data.scopeClarity || ""}
        onChange={(value) => updateData({ scopeClarity: value })}
      />

      <div className="flex flex-col gap-2 w-full">
        <label className="text-md font-semibold text-text-primary">
          How stable are the project's needs?
        </label>
        <div className="flex flex-col px-2 mt-2">
          <div className="flex items-center justify-between relative w-full h-4">
            <div className="absolute left-0 right-0 h-0.5 bg-accent-primary/30 z-0"></div>
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                onClick={() => handleStabilityChange(num)}
                className={`w-4 h-4 rounded-full border-2 bg-bg-primary z-10 cursor-pointer transition-all ${
                  getStabilitySliderValue() === num
                    ? "border-accent-primary bg-accent-primary ring-4 ring-accent-primary/20"
                    : "border-accent-primary/50 hover:border-accent-primary"
                }`}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-text-secondary mt-2">
            <span>Pretty Stable</span>
            <span>Always Changing</span>
          </div>
        </div>
      </div>

      <Select
        label="Whats the urgency level?"
        options={urgencyOptions}
        value={data.urgency || ""}
        onChange={(val) => updateData({ urgency: val })}
      />

      <div className="flex flex-col gap-2 w-full">
        <label className="text-md font-semibold text-text-primary">
          It needs to be prototyped?
        </label>
        <div className="flex flex-col gap-2 mt-1">
          {[
            { value: "yes", label: "Yes" },
            { value: "maybe", label: "Maybe" },
            { value: "no", label: "No" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="prototype"
                value={opt.value}
                checked={data.prototype === opt.value}
                onChange={(e) => updateData({ prototype: e.target.value })}
                className="w-4 h-4 text-accent-primary bg-bg-secondary border-gray-300 focus:ring-accent-primary cursor-pointer"
              />
              <span className="text-md text-text-primary group-hover:text-accent-primary transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          className="p-2 text-text-secondary hover:text-black cursor-pointer transition"
          onClick={back}
        >
          Back
        </button>
        <button
          className="
        bg-accent-primary
        text-bg-primary
        py-1
        px-4
        rounded-sm
        cursor-pointer
        hover:bg-blue-700
        transition
        "
          onClick={next}
        >
          Next
        </button>
      </div>
    </div>
  );
}
