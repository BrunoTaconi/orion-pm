"use client";
import React from "react";

type IntroStepProps = {
  projectData: any;
  updateProjectData: (values: any) => void;
  next: () => void;
};

const IntroStep = ({
  projectData,
  updateProjectData,
  next,
}: IntroStepProps) => {
  const handleNext = () => {
    if (!projectData.name || !projectData.teamId) {
      alert("Fill the required fields.");
      return;
    }
    next();
  };
  return (
    <div className="flex flex-col gap-4">
      <h2>Create Project</h2>

      <div>
        <label>Name *</label>
        <input
          type="text"
          value={projectData.name}
          onChange={(e) => updateProjectData({ name: e.target.value })}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={projectData.description}
          onChange={(e) => updateProjectData({ description: e.target.value })}
        />
      </div>

      <div>
        <label>Team *</label>
        <select
          value={projectData.teamId}
          onChange={(e) => updateProjectData({ teamId: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="1">My Team 1</option>
          <option value="2">My Team 2</option>
        </select>
      </div>

      <div>
        <label>Visibility</label>
        <select
          value={projectData.visibility}
          onChange={(e) => updateProjectData({ visibility: e.target.value })}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
          <option value="internal">Intern</option>
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={handleNext}>Advance to the assistant</button>
      </div>
    </div>
  );
};

export default IntroStep;
