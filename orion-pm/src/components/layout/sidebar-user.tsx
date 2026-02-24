"use client";

import { DynamicIcons } from "@/components/icons";

type SidebarUserProps = {
  name: string;
};

export function SidebarUser({ name }: SidebarUserProps) {
  return (
    <div
      className="
        group flex items-center gap-3 px-3 py-2 rounded-md
        cursor-pointer transition hover:bg-gray-100
      "
    >
      <DynamicIcons.Letter
        text={name}
        size={32}
        className="text-xs"
      />

      <div className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-text-secondary">
          Workspace
        </span>
      </div>
    </div>
  );
}