import type { WizardStepWithDataProps } from "../project-wizard";

export default function RisksStep({
  data,
  updateData,
  next,
  back,
}: WizardStepWithDataProps) {
  return (
    <div>
      <h2>Risks and Complexity</h2>

      <div>
        <label>Technical complexity of the project</label>
        <select
          value={data.technicalComplexity || ""}
          onChange={(e) => updateData({ technicalComplexity: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div>
        <label>Use of new technology?</label>
        <select
          value={data.newTechUse || ""}
          onChange={(e) => updateData({ newTechUse: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div>
        <label>Identifiable risks</label>
        <select
          value={data.identifiableRisks}
          onChange={(e) => updateData({ identifiableRisks: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="frequent-scope-changes">Frequent scope changes</option>
          <option value="high-customers-dependence">
            High dependence on customers
          </option>
          <option value="inexperienced-team">Inexperienced team</option>
          <option value="new-technology">New technology</option>
          <option value="tight-deadline">Tight deadline</option>
          <option value="regulations">Regulations</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button onClick={back}>Back</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}
