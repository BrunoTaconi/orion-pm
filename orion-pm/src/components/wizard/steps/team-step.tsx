import type { WizardStepWithDataProps } from "../project-wizard";

export default function TeamStep({
  data,
  updateData,
  next,
  back,
}: WizardStepWithDataProps) {
  return (
    <div>
      <h2>Team Size and Experience</h2>

      <div>
        <label>Team size</label>
        <select
          value={data.teamSize || ""}
          onChange={(e) => updateData({ teamSize: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="small">Small (1 - 4 people)</option>
          <option value="medium">Medium (5 - 8 people)</option>
          <option value="big">Big (8+ people)</option>
        </select>
      </div>

      <div>
        Disponibilidade da Equipe
        <label>Team Availability</label>
        <select
          value={data.teamAvailability || ""}
          onChange={(e) => updateData({ teamAvailability: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="high">Full time</option>
          <option value="medium">Partial</option>
          <option value="low">Irregular</option>
        </select>
      </div>

      <div>
        <label>Team experience</label>
        <select
          value={data.teamExperience}
          onChange={(e) => updateData({ teamExperience: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div>
        <label>Customer (or stakeholder) participation</label>
        <select
          value={data.customerParticipation}
          onChange={(e) => updateData({ customerParticipation: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="constant">Constant</option>
          <option value="weekly">Weekly</option>
          <option value="rare">Rare</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button onClick={back}>Back</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}
