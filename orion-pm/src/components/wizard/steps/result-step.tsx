import { WizardData } from "../project-wizard";
import { calculateRecommendation } from "@/lib/modelRecommendation";

type ResultStepProps = {
  data: WizardData;
  back: () => void;
  createProject: () => void;
};

export default function ResultStep({
  data,
  back,
  createProject,
}: ResultStepProps) {
  const result = calculateRecommendation(data);

  return (
    <div className="flex flex-col gap-4">
      <h2>Result</h2>

      <p>Recommended Methodology:</p>
      <strong>{result}</strong>

      <div className="flex gap-2">
        <button onClick={back}>Voltar</button>
        <button
          onClick={createProject}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Project
        </button>
      </div>
    </div>
  );
}
