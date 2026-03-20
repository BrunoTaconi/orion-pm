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
import { sprintsMock, workItemsMock } from "@/mocks/mock";
import { getReportMetrics } from "@/utils/report-calculations";
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

  const metrics = getReportMetrics(projectId, sprintsMock, workItemsMock);

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-5">
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
          title="Sprint Completion Ratio"
          percentage={metrics.progressPercentage}
          footerText={`${metrics.doneSprintsComparisonPercentage}% vs last sprint`}
          icon="Cycle"
        />

        <NumericStatCard
          title="Average Lead Time"
          value={metrics.avgLeadTimeDays}
          footerText="Days to deliver a task"
          icon="Recent"
          iconColor="text-green-icon"
          iconBgColor="bg-bg-light-green"
        />

        <NumericStatCard
          title="Active Bugs"
          value={metrics.activeBugsCount}
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
          data={metrics.burnupData}
          firstValueLabel="Scope (Points)"
          secondValueLabel="Completed"
        />
        <WipChart
          title="WIP (Work In Progress)"
          subtitle="Comparison of workload across sprints."
          data={metrics.wipComparisonData}
        />

        <PointsStatusChart
          title="Points Status"
          subtitle="Planned vs. Delivered."
          data={metrics.pointsMetricData}
        />

        <AvgTimeChart
          title="Average Time per Task"
          subtitle="Historical time spent in days throughout the sprints."
          data={metrics.avgTimePerTaskData}
        />

        <ResolutionTimeChart
          title="Resolution Time per Item"
          subtitle="Working days spent per task vs. Sprint average."
          data={metrics.timePerItemData}
        />

        <StageTimeChart
          title="Average Time per Step"
          subtitle="Where do tasks spend most of their time? (In hours)"
          data={metrics.timeInStagesData}
        />
      </div>
    </div>
  );
}
