import Select, { SelectOption } from "@/components/ui/select";
import type { WizardStepWithDataProps } from "../project-wizard";

export default function TeamStep({
  data,
  updateData,
  next,
  back,
}: WizardStepWithDataProps) {
  const sizeOptions: SelectOption[] = [
    {
      value: "small",
      label: "Small (1 - 4 people)",
      icon: "PeopleFilled",
      iconBgColor: "bg-bg-light-blue",
      iconColor: "text-blue-icon",
    },
    {
      value: "medium",
      label: "Medium (5 - 8 people)",
      icon: "TeamFilled",
      iconBgColor: "bg-bg-light-blue",
      iconColor: "text-blue-icon",
    },
    {
      value: "big",
      label: "Big (8+ people)",
      icon: "UsersFour",
      iconBgColor: "bg-bg-light-blue",
      iconColor: "text-blue-icon",
    },
  ];

  const availabilityOptions: SelectOption[] = [
    {
      value: "high",
      label: "Full time",
      icon: "Recent",
      iconBgColor: "bg-bg-light-green",
      iconColor: "text-green-icon",
    },
    {
      value: "medium",
      label: "Partial",
      icon: "Half",
      iconBgColor: "bg-bg-light-yellow",
      iconColor: "text-yellow-icon",
    },
    {
      value: "low",
      label: "Irregular",
      icon: "Cycle",
      iconBgColor: "bg-bg-light-red",
      iconColor: "text-red-icon",
    },
  ];

  const experienceOptions: SelectOption[] = [
    {
      value: "high",
      label: "High",
      icon: "Rocket",
      iconBgColor: "bg-bg-light-red",
      iconColor: "text-red-icon",
    },
    {
      value: "medium",
      label: "Medium",
      icon: "Tools",
      iconBgColor: "bg-bg-light-yellow",
      iconColor: "text-yellow-icon",
    },
    {
      value: "low",
      label: "Low",
      icon: "Plant",
      iconBgColor: "bg-bg-light-green",
      iconColor: "text-green-icon",
    },
  ];

  const participationOptions: SelectOption[] = [
    {
      value: "constant",
      label: "Constant",
      icon: "Infinity",
      iconBgColor: "bg-bg-light-purple",
      iconColor: "text-purple-icon",
    },
    {
      value: "weekly",
      label: "Weekly",
      icon: "Calendar",
      iconBgColor: "bg-bg-light-purple",
      iconColor: "text-purple-icon",
    },
    {
      value: "rare",
      label: "Rare",
      icon: "Diamond",
      iconBgColor: "bg-bg-light-purple",
      iconColor: "text-purple-icon",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="text-text-secondary">
        <h2 className="text-lg font-normal">
          2. Team Size and Experience
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-15 mb-6">
        <Select
          label="Team Size"
          options={sizeOptions}
          value={data.teamSize || ""}
          onChange={(value) => updateData({ teamSize: value })}
        />

        <Select
          label="Team Availability"
          options={availabilityOptions}
          value={data.teamAvailability || ""}
          onChange={(value) => updateData({ teamAvailability: value })}
        />

        <Select
          label="Team Experience"
          options={experienceOptions}
          value={data.teamExperience || ""}
          onChange={(value) => updateData({ teamExperience: value })}
        />

        <Select
          label="Customer (or stakeholder) participation"
          options={participationOptions}
          value={data.customerParticipation || ""}
          onChange={(value) => updateData({ customerParticipation: value })}
        />
      </div>

      <div className="flex justify-end gap-3">
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
