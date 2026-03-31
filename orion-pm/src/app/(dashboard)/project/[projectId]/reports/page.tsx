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
import {
  phasesMock,
  projectsMock,
  releasesMock,
  sprintsMock,
  workItemsMock,
} from "@/mocks/mock";
import {
  getCascadeMetrics,
  getKanbanMetrics,
  getMethodologyGroup,
  getReleaseMetrics,
  getReportMetrics,
} from "@/utils/report-calculations";
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

  const project = projectsMock.find((p) => p.id === projectId);
  const methodologyGroup = project
    ? getMethodologyGroup(project.methodology)
    : "SPRINT";

  // ── SPRINT (SCRUM / XP) ──────────────────────────────────────────────────
  if (methodologyGroup === "SPRINT") {
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
            footerText="Bugs that need your attention"
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

  // ── KANBAN ───────────────────────────────────────────────────────────────
  if (methodologyGroup === "KANBAN") {
    const metrics = getKanbanMetrics(projectId, workItemsMock);

    return (
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-5">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Reports & Analytics
            </h2>
            <p className="text-sm text-text-secondary">
              Flow metrics, cycle time, and throughput analysis.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-bg-secondary border border-border text-text-primary px-4 py-2 rounded-md hover:bg-bg-darker transition-colors text-sm font-medium">
            <Icons.Project size={16} /> All Items
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NumericStatCard
            title="Throughput (4 weeks)"
            value={metrics.throughput}
            footerText="Items completed in the last 4 weeks"
            icon="Cycle"
            iconColor="text-purple-500"
            iconBgColor="bg-bg-light-purple"
            valueColor="text-purple-500"
            valueBgColor="bg-bg-light-purple"
          />
          <NumericStatCard
            title="Average Cycle Time"
            value={`${metrics.avgCycleTimeDays}d`}
            footerText="Days to complete an item"
            icon="Recent"
            iconColor="text-green-icon"
            iconBgColor="bg-bg-light-green"
          />
          <NumericStatCard
            title="Active Bugs"
            value={metrics.activeBugsCount}
            footerText="Bugs that need your attention"
            icon="Bug"
            iconColor="text-red-icon"
            iconBgColor="bg-bg-light-red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BurnupChart
            title="Cumulative Flow"
            subtitle="Total items created vs. completed over the last 12 weeks."
            data={metrics.cumulativeFlowData}
            firstValueLabel="Created"
            secondValueLabel="Completed"
          />
          <WipChart
            title="WIP by Stage"
            subtitle="Current work in progress per board stage."
            data={metrics.wipByStatusData}
          />
          <PointsStatusChart
            title="Item Type Distribution"
            subtitle="Breakdown of work item types across the project."
            data={metrics.typeDistributionData}
          />
          <AvgTimeChart
            title="Weekly Throughput"
            subtitle="Number of items completed per week."
            data={metrics.weeklyThroughputData}
          />
          <ResolutionTimeChart
            title="Cycle Time per Item"
            subtitle="Working days spent per item vs. project average."
            data={metrics.timePerItemData}
          />
          <StageTimeChart
            title="Average Time per Stage"
            subtitle="Where do items spend most of their time? (In hours)"
            data={metrics.timeInStagesData}
          />
        </div>
      </div>
    );
  }

  // ── PHASE / CASCADE ──────────────────────────────────────────────────────
  if (methodologyGroup === "PHASE") {
    const metrics = getCascadeMetrics(projectId, phasesMock, workItemsMock);

    return (
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-5">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Reports & Analytics
            </h2>
            <p className="text-sm text-text-secondary">
              Phase completion, scope delivery, and milestone tracking.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-bg-secondary border border-border text-text-primary px-4 py-2 rounded-md hover:bg-bg-darker transition-colors text-sm font-medium">
            <Icons.Phases size={16} /> All Phases
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProgressStatCard
            title="Overall Progress"
            percentage={metrics.progressPercentage}
            footerText={metrics.phasesCompletedText}
            icon="Cycle"
          />
          <NumericStatCard
            title="Average Lead Time"
            value={`${metrics.avgLeadTimeDays}d`}
            footerText="Days to deliver an item"
            icon="Recent"
            iconColor="text-green-icon"
            iconBgColor="bg-bg-light-green"
          />
          <NumericStatCard
            title="Active Bugs"
            value={metrics.activeBugsCount}
            footerText="Bugs that need your attention"
            icon="Bug"
            iconColor="text-red-icon"
            iconBgColor="bg-bg-light-red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BurnupChart
            title="Phase Scope vs. Delivery"
            subtitle="Planned vs. delivered items for each project phase."
            data={metrics.phaseProgressData}
            firstValueLabel="Planned"
            secondValueLabel="Delivered"
          />
          <WipChart
            title="Active Items per Phase"
            subtitle="Items currently in progress or review per phase."
            data={metrics.activeItemsByPhaseData}
          />
          <PointsStatusChart
            title="Scope Status"
            subtitle="Overall breakdown of delivered, in-progress, and remaining scope."
            data={metrics.scopeStatusData}
          />
          <AvgTimeChart
            title="Average Time per Phase"
            subtitle="Average days to complete an item within each phase."
            data={metrics.avgTimePerPhaseData}
          />
          <ResolutionTimeChart
            title="Resolution Time per Item"
            subtitle="Working days spent per item vs. project average."
            data={metrics.timePerItemData}
          />
          {metrics.timeInStagesData.length >= 2 && (
            <StageTimeChart
              title="Average Time per Step"
              subtitle="Where do items spend most of their time? (In hours)"
              data={metrics.timeInStagesData}
            />
          )}
        </div>
      </div>
    );
  }

  // ── RELEASE (INCREMENTAL / SPIRAL) ───────────────────────────────────────
  const metrics = getReleaseMetrics(projectId, releasesMock, workItemsMock);

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-5">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            Reports & Analytics
          </h2>
          <p className="text-sm text-text-secondary">
            Release progress, delivery throughput, and incremental metrics.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-bg-secondary border border-border text-text-primary px-4 py-2 rounded-md hover:bg-bg-darker transition-colors text-sm font-medium">
          <Icons.Rocket size={16} /> All Releases
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProgressStatCard
          title={
            metrics.currentRelease
              ? `Release: ${metrics.currentRelease.version}`
              : "Release Progress"
          }
          percentage={metrics.currentReleaseProgress}
          footerText={`${metrics.releasesDelivered} of ${metrics.totalReleases} releases delivered`}
          icon="Rocket"
        />
        <NumericStatCard
          title="Average Lead Time"
          value={`${metrics.avgLeadTimeDays}d`}
          footerText="Days to deliver an item"
          icon="Recent"
          iconColor="text-green-icon"
          iconBgColor="bg-bg-light-green"
        />
        <NumericStatCard
          title="Active Bugs"
          value={metrics.activeBugsCount}
          footerText="Bugs that need your attention"
          icon="Bug"
          iconColor="text-red-icon"
          iconBgColor="bg-bg-light-red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BurnupChart
          title="Scope per Release"
          subtitle="Planned vs. delivered items for each release."
          data={metrics.releaseProgressData}
          firstValueLabel="Planned"
          secondValueLabel="Delivered"
        />
        <WipChart
          title="Active Items per Release"
          subtitle="Items currently in progress or review per release."
          data={metrics.activeItemsByReleaseData}
        />
        <PointsStatusChart
          title="Item Type Distribution"
          subtitle="Breakdown of work item types across all releases."
          data={metrics.typeDistributionData}
        />
        <AvgTimeChart
          title="Average Time per Release"
          subtitle="Average days to complete an item within each release."
          data={metrics.avgTimePerReleaseData}
        />
        <ResolutionTimeChart
          title="Resolution Time per Item"
          subtitle="Working days spent per item vs. project average."
          data={metrics.timePerItemData}
        />
        {metrics.timeInStagesData.length >= 2 && (
          <StageTimeChart
            title="Average Time per Step"
            subtitle="Where do items spend most of their time? (In hours)"
            data={metrics.timeInStagesData}
          />
        )}
      </div>
    </div>
  );
}
