"use client";

import { DynamicIcons } from "@/components/icons";

type SidebarUserProps = {
  name: string;
  isCollapsed: boolean;
};

export function SidebarUser({ name, isCollapsed }: SidebarUserProps) {
  return (
    <div
      className="
        group flex items-center gap-3 px-2 py-2 rounded-sm
        cursor-pointer transition hover:bg-bg-darker w-full
      "
    >
      <DynamicIcons.Letter
        text={name}
        size={32}
        className="text-md"
        bgColor="bg-red-600"
        textColor="text-white"
      />

      {!isCollapsed && (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-xs text-text-secondary">Workspace</span>
        </div>
      )}
    </div>
  );
}
