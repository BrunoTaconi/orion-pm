"use client";

import { useEffect, useState } from "react";
import { ReleaseMock, ReleaseStatus } from "@/mocks/mock";
import CustomSelect from "@/components/ui/select";
import { RELEASE_STATUS_OPTIONS } from "@/utils/releases-utils";

interface EditReleaseProps {
  release: ReleaseMock | null;
  onClose: () => void;
  onSave: (release: Partial<ReleaseMock>) => void;
}

const EMPTY_FORM = {
  name: "",
  version: "",
  description: "",
  status: "PLANNED" as ReleaseStatus,
  releaseDate: "",
  actualReleaseDate: "",
  releaseNotes: "",
};

export default function EditRelease({
  release,
  onClose,
  onSave,
}: EditReleaseProps) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (release) {
      setForm({
        name: release.name,
        version: release.version,
        description: release.description ?? "",
        status: release.status,
        releaseDate: new Date(release.releaseDate).toISOString().split("T")[0],
        actualReleaseDate: release.actualReleaseDate
          ? new Date(release.actualReleaseDate).toISOString().split("T")[0]
          : "",
        releaseNotes: release.releaseNotes ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [release]);

  const update = (key: keyof typeof EMPTY_FORM, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      releaseDate: new Date(form.releaseDate),
      actualReleaseDate: form.actualReleaseDate
        ? new Date(form.actualReleaseDate)
        : undefined,
      description: form.description || undefined,
      releaseNotes: form.releaseNotes || undefined,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-secondary">
            Release Name *
          </label>
          <input
            required
            className="bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-primary"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Content Module"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-secondary">
            Version *
          </label>
          <input
            required
            className="bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-primary font-mono"
            value={form.version}
            onChange={(e) => update("version", e.target.value)}
            placeholder="v1.1.0"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-text-secondary">
          Description
        </label>
        <textarea
          rows={2}
          className="bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-primary resize-none"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="What will this release include?"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <CustomSelect
          label="Status"
          options={RELEASE_STATUS_OPTIONS}
          value={form.status}
          onChange={(v) => update("status", v)}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-secondary">
            Target Date *
          </label>
          <input
            required
            type="date"
            className="bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-primary"
            value={form.releaseDate}
            onChange={(e) => update("releaseDate", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-secondary">
            Actual Release Date
          </label>
          <input
            type="date"
            className="bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-primary"
            value={form.actualReleaseDate}
            onChange={(e) => update("actualReleaseDate", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-text-secondary">
          Release Notes
        </label>
        <textarea
          rows={3}
          className="bg-bg-secondary border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-primary resize-none"
          value={form.releaseNotes}
          onChange={(e) => update("releaseNotes", e.target.value)}
          placeholder="What shipped? Known issues?"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-border mt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-accent-primary text-white rounded-md hover:opacity-90 transition-opacity"
        >
          {release ? "Save Changes" : "Create Release"}
        </button>
      </div>
    </form>
  );
}
