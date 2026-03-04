"use client";
import type { WizardStepWithDataProps } from "../project-wizard";

export default function ProjectProfileStep({
  data,
  updateData,
  next,
  back,
}: WizardStepWithDataProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2>1. Project Profile</h2>

      <div>
        <label>How clear is the scope?</label>
        <select
          value={data.scopeClarity || ""}
          onChange={(e) => updateData({ scopeClarity: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="clear">Well defined</option>
          <option value="partial">Partially defined</option>
          <option value="undefined">Still not defined</option>
        </select>
      </div>

      <div>
        <label>How stable are the project's needs?</label>
        <select
          value={data.stability || ""}
          onChange={(e) => updateData({ stability: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="pretty-stable">Pretty Stable</option>
          <option value="always-changing">Always Changinh</option>
        </select>
      </div>

      <div>
        <label>It needs to be prototyped?</label>
        <select
          value={data.prototype}
          onChange={(e) => updateData({ prototype: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="maybe">Maybe</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button onClick={back}>Back</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}
