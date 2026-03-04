import type { WizardStepWithDataProps } from "../project-wizard";

export function RequirementsStep({
  data,
  updateData,
  next,
  back,
}: WizardStepWithDataProps) {
  return (
    <div>
      <h2>Requirements and Formality</h2>

      <div>
        <label>Does the customer know exactly what they want?</label>
        <select
          value={data.clientNeedsClarity || ""}
          onChange={(e) => updateData({ clientNeedsClarity: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="partially">Partially</option>
          <option value="no">No</option>
        </select>
      </div>

      <div>
        <label>Predominant type of requirements</label>
        <select
          value={data.requirementsType || ""}
          onChange={(e) => updateData({ requirementsType: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="functional">Functional</option>
          <option value="non-functional">Non-functional</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div>
        <label>Required level of formal documentation</label>
        <select
          value={data.documentationLevel}
          onChange={(e) => updateData({ documentationLevel: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div>
        <label>External dependencies / regulations</label>
        <select
          value={data.externalDependencies}
          onChange={(e) =>
            updateData({ externalDependencies: e.target.value })
          }
        >
          <option value="">Select an option</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button onClick={back}>Back</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}
