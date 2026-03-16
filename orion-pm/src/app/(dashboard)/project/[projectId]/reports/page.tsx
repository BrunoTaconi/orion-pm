"use client";

import { Icons } from "@/components/icons";
import { workItemsMock } from "@/mocks/mock";
import { getTypeDetails } from "@/utils/board-utils";
import { use, useEffect, useState } from "react";

export default function ReportsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.projectId;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const velocityData = [
    { name: "Sprint 1", planned: 30, completed: 25 },
    { name: "Sprint 2", planned: 28, completed: 28 },
    { name: "Sprint 3", planned: 35, completed: 20 },
    { name: "Sprint 4", planned: 32, completed: 30 },
    { name: "Sprint 5 (Current)", planned: 25, completed: 12 },
  ];

  const maxVelocityPoints = Math.max(
    ...velocityData.flatMap((data) => [data.planned, data.completed]),
  );

  const projectTasks = workItemsMock.filter(
    (task) => task.projectId === projectId,
  );

  const typeDistribution = [
    {
      type: "STORY",
      count: projectTasks.filter((t) => t.type === "STORY").length,
    },
    {
      type: "TASK",
      count: projectTasks.filter((t) => t.type === "TASK").length,
    },
    { type: "BUG", count: projectTasks.filter((t) => t.type === "BUG").length },
    {
      type: "SPIKE",
      count: projectTasks.filter((t) => t.type === "SPIKE").length,
    },
  ].filter((d) => d.count > 0);

  const totalTasks = typeDistribution.reduce(
    (acc, curr) => acc + curr.count,
    0,
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-10">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            Reports & Analytics
          </h2>
          <p className="text-sm text-text-secondary">
            Track your team&apos;s performance and project health over time.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-bg-secondary border border-border text-text-primary px-4 py-2 rounded-md hover:bg-bg-darker transition-colors text-sm font-medium">
          <Icons.Calendar size={16} /> Last 5 Sprints
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-bg-primary border border-border rounded-xl p-5 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center gap-2 text-text-secondary mb-2">
            <Icons.Cycle size={16} className="text-blue-500" />
            <span className="text-sm font-bold">Sprint Completion Rate</span>
          </div>
          <h3 className="text-3xl font-black text-text-primary">82%</h3>
          <p className="text-xs text-green-500 font-medium mt-1 flex items-center gap-1">
            <Icons.ArrowUp size={12} /> +5% from last sprint
          </p>
        </div>

        <div className="bg-bg-primary border border-border rounded-xl p-5 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center gap-2 text-text-secondary mb-2">
            <Icons.Recent size={16} className="text-purple-500" />
            <span className="text-sm font-bold">Average Lead Time</span>
          </div>
          <h3 className="text-3xl font-black text-text-primary">
            4.2{" "}
            <span className="text-lg text-text-secondary font-medium">
              days
            </span>
          </h3>
          <p className="text-xs text-text-secondary font-medium mt-1">
            From creation to done
          </p>
        </div>

        <div className="bg-bg-primary border border-border rounded-xl p-5 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center gap-2 text-text-secondary mb-2">
            <Icons.Bug size={16} className="text-red-500" />
            <span className="text-sm font-bold">Active Bugs</span>
          </div>
          <h3 className="text-3xl font-black text-text-primary">3</h3>
          <p className="text-xs text-red-500 font-medium mt-1 flex items-center gap-1">
            <Icons.ArrowUp size={12} /> 1 critical bug requires attention
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-text-primary">Velocity Chart</h3>
              <p className="text-xs text-text-secondary">
                Compare planned vs completed story points.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5 text-text-secondary">
                <div className="w-3 h-3 rounded-sm bg-bg-darker border border-border"></div>{" "}
                Planned
              </div>
              <div className="flex items-center gap-1.5 text-text-primary">
                <div className="w-3 h-3 rounded-sm bg-accent-primary"></div>{" "}
                Completed
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-end gap-6 min-h-50 mt-auto pt-4 border-b border-border pb-2 relative">
            <div className="absolute w-full h-px bg-border bottom-[25%] opacity-50 z-0"></div>
            <div className="absolute w-full h-px bg-border bottom-[50%] opacity-50 z-0"></div>
            <div className="absolute w-full h-px bg-border bottom-[75%] opacity-50 z-0"></div>
            <div className="absolute w-full h-px bg-border top-0 opacity-50 z-0"></div>

            {velocityData.map((sprint) => (
              <div
                key={sprint.name}
                className="flex-1 flex flex-col items-center gap-2 z-10 h-full justify-end"
              >
                <div className="flex items-end gap-1.5 w-full justify-center h-full">
                  <div
                    title={`Planned: ${sprint.planned} pts`}
                    className="w-1/3 max-w-6 bg-bg-darker border border-border rounded-t-sm hover:opacity-80 transition-opacity cursor-crosshair"
                    style={{
                      height: `${(sprint.planned / maxVelocityPoints) * 100}%`,
                    }}
                  ></div>
                  <div
                    title={`Completed: ${sprint.completed} pts`}
                    className="w-1/3 max-w-6 bg-accent-primary rounded-t-sm hover:opacity-80 transition-opacity cursor-crosshair shadow-[0_0_10px_rgba(var(--color-accent-primary),0.3)]"
                    style={{
                      height: `${(sprint.completed / maxVelocityPoints) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-2">
            {velocityData.map((sprint) => (
              <span
                key={sprint.name}
                className="flex-1 text-center text-[10px] font-bold text-text-secondary uppercase"
              >
                {sprint.name.replace(" (Current)", "")}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-text-primary">
              Issue Type Breakdown
            </h3>
            <p className="text-xs text-text-secondary">
              Current workload distribution.
            </p>
          </div>

          <div className="flex flex-col gap-5 mt-auto">
            {typeDistribution.length === 0 ? (
              <span className="text-sm text-text-secondary text-center italic py-10">
                No tasks found.
              </span>
            ) : (
              typeDistribution.map((item) => {
                const details = getTypeDetails(item.type);
                const TypeIcon = Icons[details.icon as keyof typeof Icons];
                const percentage = Math.round((item.count / totalTasks) * 100);

                return (
                  <div key={item.type} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1 rounded ${details.iconBgColor} ${details.iconColor}`}
                        >
                          {TypeIcon && <TypeIcon size={12} />}
                        </div>
                        <span className="font-bold text-text-primary">
                          {details.label}
                        </span>
                      </div>
                      <span className="text-text-secondary font-medium">
                        {percentage}% ({item.count})
                      </span>
                    </div>
                    {/* Barra de Progresso */}
                    <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${details?.iconColor.replace("text-", "bg-")}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
