import { SprintMock, WorkItemMock } from "@/mocks/mock";

export function getReportMetrics(
  projectId: string,
  sprints: SprintMock[],
  workItems: WorkItemMock[],
) {
  const activeSprint = sprints.find(
    (sprint) => sprint.projectId === projectId && sprint.status === "ACTIVE",
  );

  const lastSprint = sprints
    .filter(
      (sprint) => sprint.projectId === projectId && sprint.status === "CLOSED",
    )
    .at(-1);

  const sprintTasks = workItems.filter(
    (wi) => wi.sprintId === activeSprint?.id,
  );

  const lastSprintTasks = workItems.filter(
    (wi) => wi.sprintId === lastSprint?.id,
  );

  const doneSprintTasks = sprintTasks.filter(
    (wi) => wi.status === "DONE" || wi.status === "CLOSED",
  );

  const lastSprintDoneTasks = lastSprintTasks.filter(
    (wi) => wi.status === "DONE" || wi.status === "CLOSED",
  ).length;

  const totalTasks = sprintTasks.length;
  const doneTasks = doneSprintTasks.length;

  const progressPercentage =
    totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const doneSprintsComparisonPercentage =
    lastSprintDoneTasks > 0
      ? Math.round(
          ((doneTasks - lastSprintDoneTasks) / lastSprintDoneTasks) * 100,
        )
      : 100;

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

  const avgLeadTimeDays = (avgLeadTime / 24).toFixed(0);

  const activeBugsCount = sprintTasks.filter(
    (wi) => wi.type === "BUG" && wi.status !== "DONE" && wi.status !== "CLOSED",
  ).length;

  const burnupData = [];
  if (activeSprint) {
    let currentDate = new Date(activeSprint.startDate);
    const endDate = new Date(activeSprint.endDate);
    const totalSprintPoints = sprintTasks.reduce(
      (acc, wi) => acc + (wi.storyPoints || 0),
      0,
    );

    let dayCount = 1;
    while (currentDate <= endDate && currentDate <= new Date()) {
      const dayEnd = new Date(currentDate);
      dayEnd.setHours(23, 59, 59, 999);

      const completedPointsUpToDay = doneSprintTasks
        .filter((wi) => wi.completedAt && new Date(wi.completedAt) <= dayEnd)
        .reduce((acc, wi) => acc + (wi.storyPoints || 0), 0);

      burnupData.push({
        day: `Day ${dayCount}`,
        scope: totalSprintPoints,
        completed: completedPointsUpToDay,
      });

      currentDate.setDate(currentDate.getDate() + 1);
      dayCount++;
    }
  }

  const wipComparisonData = sprints
    .filter((sprint) => sprint.projectId === projectId)
    .map((sprint) => {
      const itemsInSprint = workItems.filter((wi) => wi.sprintId === sprint.id);
      return {
        sprint: sprint.name,
        wip: itemsInSprint.length,
      };
    });

  const plannedPoints = sprintTasks.reduce(
    (acc, wi) => acc + (wi.storyPoints || 0),
    0,
  );
  const deliveredPoints = doneSprintTasks.reduce(
    (acc, wi) => acc + (wi.storyPoints || 0),
    0,
  );

  const pointsMetricData = [
    { name: "Planned", value: plannedPoints, fill: "rgb(100 104 120)" },
    { name: "Delivered", value: deliveredPoints, fill: "#22c55e" },
    {
      name: "Spikes (Delivered)",
      value: doneSprintTasks
        .filter((wi) => wi.type === "SPIKE")
        .reduce((acc, wi) => acc + (wi.storyPoints || 0), 0),
      fill: "rgb(147 51 234)",
    },
    {
      name: "Tech Debts (Delivered)",
      value: doneSprintTasks
        .filter((wi) => wi.type === "TECH_DEBT")
        .reduce((acc, wi) => acc + (wi.storyPoints || 0), 0),
      fill: "rgb(244 180 0)",
    },
    {
      name: "Bugs (Resolved)",
      value: doneSprintTasks.filter((wi) => wi.type === "BUG").length,
      fill: "rgb(234 60 44)",
    },
  ];

  const avgTimePerTaskData = sprints
    .filter((sprint) => sprint.projectId === projectId)
    .map((sprint) => {
      const sDoneTasks = workItems.filter(
        (wi) =>
          wi.sprintId === sprint.id &&
          (wi.status === "DONE" || wi.status === "CLOSED"),
      );
      const avgHours =
        sDoneTasks.length > 0
          ? sDoneTasks.reduce(
              (acc, wi) =>
                acc +
                ((wi.timeInProgress ?? 0) +
                  (wi.timeInReview ?? 0) +
                  (wi.timeInValidation ?? 0)),
              0,
            ) / sDoneTasks.length
          : 0;
      return {
        sprint: sprint.name,
        time: Number((avgHours / 24).toFixed(1)),
      };
    });

  const sprintAvgDays = Number((avgLeadTime / 24).toFixed(1));
  const timePerItemData = doneSprintTasks.map((wi) => {
    const totalHours =
      (wi.timeInProgress ?? 0) +
      (wi.timeInReview ?? 0) +
      (wi.timeInValidation ?? 0);
    return {
      task: wi.title.length > 15 ? wi.title.substring(0, 15) + "..." : wi.title,
      days: Number((totalHours / 24).toFixed(1)),
      avg: sprintAvgDays,
    };
  });

  const avgInProgress = doneSprintTasks.length
    ? doneSprintTasks.reduce((acc, wi) => acc + (wi.timeInProgress ?? 0), 0) /
      doneSprintTasks.length
    : 0;
  const avgInReview = doneSprintTasks.length
    ? doneSprintTasks.reduce((acc, wi) => acc + (wi.timeInReview ?? 0), 0) /
      doneSprintTasks.length
    : 0;
  const avgInValidation = doneSprintTasks.length
    ? doneSprintTasks.reduce((acc, wi) => acc + (wi.timeInValidation ?? 0), 0) /
      doneSprintTasks.length
    : 0;

  const timeInStagesData = [
    {
      stage: "In Progress",
      hours: Number(avgInProgress.toFixed(1)),
      fill: "#f59e0b",
    },
    { stage: "Review", hours: Number(avgInReview.toFixed(1)), fill: "#8b5cf6" },
    {
      stage: "Validation",
      hours: Number(avgInValidation.toFixed(1)),
      fill: "#06b6d4",
    },
  ];

  return {
    progressPercentage,
    doneSprintsComparisonPercentage,
    avgLeadTimeDays,
    activeBugsCount,
    burnupData,
    wipComparisonData,
    pointsMetricData,
    avgTimePerTaskData,
    timePerItemData,
    timeInStagesData,
  };
}
