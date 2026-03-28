import { PhaseMock } from "@/mocks/mock";
import { useState } from "react";
import Select from "../ui/select";
import { PHASE_STATUS_OPTIONS } from "@/utils/timeline-utils";

interface EditPhaseProps {
  phase: PhaseMock | null;
  isCreating: boolean;
  onClose: () => void;
}

export default function EditPhase({
  phase,
  isCreating,
  onClose,
}: EditPhaseProps) {
  const [formData, setFormData] = useState({
    name: phase?.name ?? "",
    description: phase?.description ?? "",
    status: phase?.status ?? "PENDING",
    startDate: phase?.endDate ? phase.endDate.toISOString().split("T")[0] : "",
    endDate: phase?.endDate ? phase.endDate.toISOString().split("T")[0] : "",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isCreating ? "Creating phase" : "Updating phase:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Phase Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full bg-bg-secondary border border-border rounded-md px-3 py-2 text-text-primary outline-none focus:border-accent-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full bg-bg-secondary border border-border rounded-md px-3 py-2 text-text-primary outline-none focus:border-accent-primary min-h-25"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
            className="w-full bg-bg-secondary border border-border rounded-md px-3 py-2 text-text-primary outline-none focus:border-accent-primary cursor-pointer"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            End Date
          </label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => updateField("endDate", e.target.value)}
            className="w-full bg-bg-secondary border border-border rounded-md px-3 py-2 text-text-primary outline-none focus:border-accent-primary cursor-pointer"
            required
          />
        </div>
      </div>

      <div className="w-full pb-8">
        <Select
          label="Status"
          options={PHASE_STATUS_OPTIONS}
          value={formData.status}
          onChange={(value) => updateField("status", value)}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md text-text-secondary hover:bg-bg-secondary transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex font-medium items-center gap-2 bg-accent-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
        >
          {isCreating ? "Create Phase" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
