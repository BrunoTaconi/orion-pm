"use client";

import React, { use } from "react";
import {
  ProjectStatusCard,
  EventListCard,
  ProgressStatCard,
  ComparisonStatCard,
  NumericStatCard,
  AlertListCard,
  WorkloadCard,
} from "@/components/ui/widgets";

import { sprintsMock, workItemsMock, usersMock } from "@/mocks/mock";

export default function ProjectDashboardPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.projectId;

  const activeSprint = sprintsMock.find(
    (s) => s.projectId === projectId && s.status === "ACTIVE",
  );

  const sprintTasks = workItemsMock.filter(
    (wi) => wi.sprintId === activeSprint?.id,
  );

  const totalTasks = sprintTasks.length;
  const doneTasks = sprintTasks.filter(
    (wi) => wi.status === "DONE" || wi.status === "CLOSED",
  ).length;
  const inProgressTasks = sprintTasks.filter(
    (wi) => wi.status === "IN_PROGRESS",
  ).length;

  const progressPercentage =
    totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const totalPoints = sprintTasks.reduce(
    (acc, curr) => acc + (curr.storyPoints || 0),
    0,
  );
  const donePoints = sprintTasks
    .filter((wi) => wi.status === "DONE")
    .reduce((acc, curr) => acc + (curr.storyPoints || 0), 0);

  const workloadMap = new Map<string, number>();
  sprintTasks.forEach((task) => {
    if (task.assigneeId) {
      workloadMap.set(
        task.assigneeId,
        (workloadMap.get(task.assigneeId) || 0) + 1,
      );
    } else {
      workloadMap.set("unassigned", (workloadMap.get("unassigned") || 0) + 1);
    }
  });

  const workloadItems = Array.from(workloadMap.entries())
    .map(([userId, count]) => {
      const user = usersMock.find((u) => u.id === userId);
      const percentage = Math.round((count / totalTasks) * 100);
      return {
        name: user ? user.name : "Unassigned",
        value: percentage,
      };
    })
    .sort((a, b) => b.value - a.value);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { day: "2-digit", month: "short" });

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-8">
      {" "}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectStatusCard
          title={activeSprint?.name || "No Active Sprint"}
          subtitle="Your current sprint."
          subtitleLinkText="See all sprints"
          actionText="Edit Sprint"
          headerIcon="Scrum"
          statusIcon="Cycle"
          statusText={activeSprint ? "In progress" : "Not started"}
          dateStart={
            activeSprint ? formatDate(activeSprint.startDate) : undefined
          }
          dateEnd={activeSprint ? formatDate(activeSprint.endDate) : undefined}
          description={`You are working on ${activeSprint?.name || "planning"}. `}
          footerActionText="Go to Backlog"
        />

        <EventListCard
          title="Upcoming Sprint Events"
          subtitle="Keep track of your next commitments."
          headerIcon="Calendar"
          events={[
            { date: "10", title: "Daily Scrum", time: "(tomorrow - 10:00 AM)" },
            { date: "14", title: "Sprint Review", time: "(14 Aug - 09:30 AM)" },
            {
              date: "14",
              title: "Sprint Retrospective",
              time: "(14 Aug - 10:30 AM)",
            },
          ]}
          footerActionText="See all events"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProgressStatCard
          title="Sprint Progress"
          percentage={progressPercentage}
          footerText={`${doneTasks} of ${totalTasks} tasks completed`}
          icon="Cycle"
        />

        <ComparisonStatCard
          title="Story Points"
          value1={donePoints}
          value2={totalPoints}
          footerText="remaining"
          icon="Favorite"
        />

        <NumericStatCard
          title="Tasks in Progress"
          value={inProgressTasks}
          footerText="In progress"
          icon="Tools"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertListCard
          title="Needs your attention"
          subtitle="These points can impact the sprint's success."
          headerIcon="Warning"
          alerts={[
            {
              text: "1 critical bug is open",
              icon: "Blocked",
            },
            {
              text: "Sprint at risk of delay",
              icon: "Blocked",
            },
          ]}
        />

        <WorkloadCard
          title="Team Workload"
          subtitle="Current task distribution among the team."
          headerIcon="TeamFilled"
          items={workloadItems}
        />
      </div>
    </div>
  );
}
