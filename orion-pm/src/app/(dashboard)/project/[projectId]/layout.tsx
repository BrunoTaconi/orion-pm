"use client";

import React, { use } from "react";
import { DynamicIcons, Icons } from "@/components/icons";
import { projectsMock } from "@/mocks/mock";
import Link from "next/link";
import { usePathname } from "next/navigation";

const projectTabs = [
  { name: "Dashboard", href: "dashboard", icon: "Dashboard", showFor: ["ALL"] },
  { name: "Backlog", href: "backlog", icon: "Book", showFor: ["SCRUM", "XP"] },
  {
    name: "Board",
    href: "board",
    icon: "Project",
    showFor: ["SCRUM", "KANBAN", "XP", "INCREMENTAL", "SPIRAL"],
  },
  { name: "Sprints", href: "sprints", icon: "Cycle", showFor: ["SCRUM", "XP"] },
  { name: "Reports", href: "reports", icon: "Paper", showFor: ["ALL"] },
];

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const pathname = usePathname();

  const resolvedParams = use(params);

  const project = projectsMock.find(
    (project) => project.id === resolvedParams.projectId,
  );

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-text-secondary">Project not found.</p>
      </div>
    );
  }

  const visibleTabs = projectTabs.filter(
    (tab) =>
      tab.showFor.includes("ALL") || tab.showFor.includes(project.methodology),
  );

  return (
    <div className="flex flex-col h-full bg-bg-secondary w-full">
      <div className="bg-bg-primary border-b border-border px-8 pt-6 pb-0 flex flex-col gap-6">
        <div className="text-sm text-text-secondary flex items-center gap-2">
          <Link
            href="/dashboard"
            className="hover:text-text-primary transition-colors"
          >
            Home
          </Link>
          <span>›</span>{" "}
          <span className="text-text-primary font-medium">Projects</span>
        </div>

        <div className="flex items-center gap-3">
          <DynamicIcons.Letter
            text={project.name}
            size={28}
            bgColor="bg-red-500"
            textColor="text-white"
            className="rounded-md text-sm"
          />
          <h1 className="text-2xl font-bold text-text-primary">
            {project.name}
          </h1>
        </div>

        <div className="flex gap-6 mt-2">
          {visibleTabs.map((tab) => {
            const TabIcon = Icons[tab.icon as keyof typeof Icons];
            const isActive = pathname.includes(
              `/project/${resolvedParams.projectId}/${tab.href}`,
            );

            return (
              <Link
                key={tab.href}
                href={`/project/${resolvedParams.projectId}/${tab.href}`}
                className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
                  isActive
                    ? "border-accent-primary text-accent-primary font-semibold"
                    : "border-transparent text-text-secondary hover:text-text-primary hover:border-border"
                }`}
              >
                {TabIcon && <TabIcon size={16} />}
                <span className="text-sm">{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">{children}</div>
    </div>
  );
}
