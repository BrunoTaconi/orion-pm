"use client";

import { Icons } from "@/components/icons";
import {
  AvgTimeChart,
  BurnupChart,
  NumericStatCard,
  PointsStatusChart,
  ProgressStatCard,
  ResolutionTimeChart,
  StageTimeChart,
  WipChart,
} from "@/components/ui/widgets";
import { reportMocks, sprintsMock, workItemsMock } from "@/mocks/mock";
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

  const activeSprint = sprintsMock.find(
    (sprint) => sprint.projectId === projectId && sprint.status === "ACTIVE",
  );

  const lastSprint = sprintsMock
    .filter(
      (sprint) => sprint.projectId === projectId && sprint.status === "CLOSED",
    )
    .at(-1);

  const lastSprintTasks = workItemsMock.filter(
    (wi) => wi.sprintId === lastSprint?.id,
  );

  const sprintTasks = workItemsMock.filter(
    (wi) => wi.sprintId === activeSprint?.id,
  );

  const totalTasks = sprintTasks.length;
  const doneTasks = sprintTasks.filter(
    (wi) => wi.status === "DONE" || wi.status === "CLOSED",
  ).length;

  const lastSprintDoneTasks = lastSprintTasks.filter(
    (wi) => wi.status === "DONE" || wi.status === "CLOSED",
  ).length;

  const progressPercentage =
    totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const doneSprintsComparisonPerentage =
    lastSprintDoneTasks && lastSprintDoneTasks > 0
      ? Math.round(
          (doneTasks - lastSprintDoneTasks / lastSprintDoneTasks) * 100,
        )
      : 100;

  const doneSprintTasks = sprintTasks.filter(
    (wi) => wi.status === "DONE" || wi.status === "CLOSED",
  );

  const avgLeadTime =
    doneSprintTasks.length > 0
      ? Number(
          (
            doneSprintTasks.reduce((acc, wi) => {
              const totalTime =
                (wi.timeInProgress ?? 0) +
                (wi.timeInReview ?? 0) +
                (wi.timeInValidation ?? 0);

              return acc + totalTime;
            }, 0) / doneSprintTasks.length
          ).toFixed(1),
        )
      : 0;

  const activeBugs = sprintTasks.filter(
    (wi) => wi.type === "BUG" && wi.status !== "DONE" && wi.status !== "CLOSED",
  ).length;

  const burnupData = reportMocks?.burnupData;

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-5">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            Reports & Analytics
          </h2>
          <p className="text-sm text-text-secondary">
            Performance metrics, WIP (Work In Progress), and resolution time.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-bg-secondary border border-border text-text-primary px-4 py-2 rounded-md hover:bg-bg-darker transition-colors text-sm font-medium">
          <Icons.Calendar size={16} /> Current Sprint
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProgressStatCard
          title="Sprint Completion Rato"
          percentage={progressPercentage ? progressPercentage : 0}
          footerText={`${doneSprintsComparisonPerentage}% vs last sprint`}
          icon="Cycle"
        />

        <NumericStatCard
          title="Average Lead Time"
          value={(avgLeadTime / 24).toFixed(0)}
          footerText="Days to deliver a task"
          icon="Recent"
          iconColor="text-green-icon"
          iconBgColor="bg-bg-light-green"
        />

        <NumericStatCard
          title="Active Bugs"
          value={activeBugs}
          footerText="Bugs that needs your attention"
          icon="Bug"
          iconColor="text-red-icon"
          iconBgColor="bg-bg-light-red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BurnupChart
          title="Burnup Chart"
          subtitle="Planned scope vs. work completed in the current sprint."
          data={burnupData}
          firstValueLabel="Scope"
          secondValueLabel="Completed"
        />
        <WipChart
          title="WIP (Work In Progress)"
          subtitle="Comparison of workload across sprints."
          data={reportMocks.wipComparison}
        />

        <PointsStatusChart
          title="Points Status"
          subtitle="Planned vs. Delivered."
          data={reportMocks.pointsMetric}
        />

        <AvgTimeChart
          title="Average Time per Task"
          subtitle="Historical time spent in days throughout the sprints."
          data={reportMocks.avgTimePerTask}
        />

        <ResolutionTimeChart
          title="Resolution Time per Item"
          subtitle="Working days spent per task vs. Sprint average."
          data={reportMocks.timePerItem}
        />

        <StageTimeChart
          title="Average Time per Step"
          subtitle="Where do tasks spend most of their time? (In hours)"
          data={reportMocks.timeInStages}
        />
      </div>
    </div>
  );
}
