"use client";
import Input from "@/components/ui/input";
import Select, { SelectOption } from "@/components/ui/select";
import React from "react";

type IntroStepProps = {
  projectData: any;
  updateProjectData: (values: any) => void;
  next: () => void;
  onClose: () => void;
};

const IntroStep = ({
  projectData,
  updateProjectData,
  next,
  onClose,
}: IntroStepProps) => {
  const handleNext = () => {
    if (!projectData.name || !projectData.teamId) {
      alert("Fill the required fields.");
      return;
    }
    next();
  };

  const teamOptions: SelectOption[] = [
    {
      value: "1",
      label: "Meu Time 1",
      icon: "Team",
      iconColor: "text-orange-icon",
      iconBgColor: "bg-bg-light-orange",
    },
    {
      value: "2",
      label: "Meu Time 2",
      icon: "Team",
      iconColor: "text-purple-icon",
      iconBgColor: "bg-bg-light-purple",
    },
  ];

  const visibilityOptions: SelectOption[] = [
    {
      value: "private",
      label: "Privado",
      icon: "Lock",
      iconColor: "text-red-icon",
      iconBgColor: "bg-bg-light-red",
    },
    {
      value: "public",
      label: "Público",
      icon: "Globe",
      iconColor: "text-green-icon",
      iconBgColor: "bg-bg-light-green",
    },
    {
      value: "internal",
      label: "Interno",
      icon: "Building",
      iconColor: "text-blue-icon",
      iconBgColor: "bg-bg-light-blue",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="text-text-secondary">
        <h2 className="text-lg font-normal">First Steps</h2>
      </div>
      <Input
        label="Name"
        required
        type="text"
        placeholder="Project name"
        value={projectData.name}
        onChange={(e) => updateProjectData({ name: e.target.value })}
      />
      <Input
        label="Description"
        multiline
        rows={3}
        required
        type="text"
        placeholder="Brief summary of the project's objective."
        value={projectData.description}
        onChange={(e) => updateProjectData({ description: e.target.value })}
      />

      <Select
        label="Team"
        required
        options={teamOptions}
        value={projectData.teamId}
        onChange={(value) => updateProjectData({ teamId: value })}
        placeholder="Select a team"
      />

      <Input
        label="Deadline"
        type="date"
        value={projectData.deadline || ""}
        onChange={(e) => updateProjectData({ deadline: e.target.value })}
      />

      <Select
        label="Visibility"
        required
        options={visibilityOptions}
        value={projectData.visibility}
        onChange={(value) => updateProjectData({ visibility: value })}
        placeholder="Select visibility"
      />

      <div className="flex justify-end gap-5">
        <button
          className="p-2 text-text-secondary hover:text-black cursor-pointer transition"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="
        bg-accent-primary
        text-bg-primary
        p-2
        rounded-sm
        cursor-pointer
        hover:bg-blue-700
        transition
        "
          onClick={handleNext}
        >
          Advance to the assistant
        </button>
      </div>
    </div>
  );
};

export default IntroStep;
