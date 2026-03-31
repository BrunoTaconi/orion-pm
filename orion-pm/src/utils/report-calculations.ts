import {
  Methodology,
  PhaseMock,
  ReleaseMock,
  SprintMock,
  WorkItemMock,
} from "@/mocks/mock";

// ─── Methodology Group ────────────────────────────────────────────────────────

export type MethodologyGroup = "SPRINT" | "KANBAN" | "PHASE" | "RELEASE";

export function getMethodologyGroup(
  methodology: Methodology,
): MethodologyGroup {
  if (methodology === "SCRUM" || methodology === "XP") return "SPRINT";
  if (methodology === "KANBAN") return "KANBAN";
  if (methodology === "CASCADE") return "PHASE";
  return "RELEASE"; // INCREMENTAL, SPIRAL
}

// ─── SPRINT (Scrum / XP) ─────────────────────────────────────────────────────

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

// ─── KANBAN ───────────────────────────────────────────────────────────────────

export function getKanbanMetrics(
  projectId: string,
  workItems: WorkItemMock[],
) {
  const projectItems = workItems.filter((wi) => wi.projectId === projectId);
  const doneItems = projectItems.filter(
    (wi) => wi.status === "DONE" || wi.status === "CLOSED",
  );
  const doneItemsWithTime = doneItems.filter((wi) => wi.timeInProgress);

  // Throughput: items completed in the last 28 days
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
  const throughput = doneItems.filter(
    (wi) => wi.completedAt && new Date(wi.completedAt) >= fourWeeksAgo,
  ).length;

  // Average Cycle Time (hours → days)
  const avgCycleTimeHours =
    doneItemsWithTime.length > 0
      ? doneItemsWithTime.reduce(
          (acc, wi) =>
            acc +
            (wi.timeInProgress ?? 0) +
            (wi.timeInReview ?? 0) +
            (wi.timeInValidation ?? 0),
          0,
        ) / doneItemsWithTime.length
      : 0;
  const avgCycleTimeDays = (avgCycleTimeHours / 24).toFixed(0);

  // Active Bugs
  const activeBugsCount = projectItems.filter(
    (wi) =>
      wi.type === "BUG" && wi.status !== "DONE" && wi.status !== "CLOSED",
  ).length;

  // Cumulative Flow (last 12 weeks)
  const twelveWeeksAgo = new Date();
  twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84);
  const cumulativeFlowData = Array.from({ length: 12 }, (_, i) => {
    const weekEnd = new Date(twelveWeeksAgo);
    weekEnd.setDate(weekEnd.getDate() + (i + 1) * 7);
    return {
      day: `Wk ${i + 1}`,
      scope: projectItems.filter((wi) => new Date(wi.createdAt) <= weekEnd)
        .length,
      completed: projectItems.filter(
        (wi) => wi.completedAt && new Date(wi.completedAt) <= weekEnd,
      ).length,
    };
  });

  // WIP by stage (board column equivalent)
  const wipByStatusData = [
    {
      sprint: "Backlog",
      wip: projectItems.filter((wi) => wi.status === "TO_DO").length,
    },
    {
      sprint: "In Progress",
      wip: projectItems.filter((wi) => wi.status === "IN_PROGRESS").length,
    },
    {
      sprint: "In Review",
      wip: projectItems.filter((wi) => wi.status === "IN_REVIEW").length,
    },
  ];

  // Item type distribution
  const typeDistributionData = [
    {
      name: "Stories",
      value: projectItems.filter((wi) => wi.type === "STORY").length,
      fill: "#3b82f6",
    },
    {
      name: "Tasks",
      value: projectItems.filter((wi) => wi.type === "TASK").length,
      fill: "rgb(100 104 120)",
    },
    {
      name: "Bugs",
      value: projectItems.filter((wi) => wi.type === "BUG").length,
      fill: "rgb(234 60 44)",
    },
    {
      name: "Spikes",
      value: projectItems.filter((wi) => wi.type === "SPIKE").length,
      fill: "rgb(147 51 234)",
    },
    {
      name: "Tech Debt",
      value: projectItems.filter((wi) => wi.type === "TECH_DEBT").length,
      fill: "rgb(244 180 0)",
    },
  ].filter((d) => d.value > 0);

  // Weekly throughput (last 8 weeks)
  const eightWeeksAgo = new Date();
  eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 56);
  const weeklyThroughputData = Array.from({ length: 8 }, (_, i) => {
    const weekStart = new Date(eightWeeksAgo);
    weekStart.setDate(weekStart.getDate() + i * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    return {
      sprint: `Wk ${i + 1}`,
      time: doneItems.filter(
        (wi) =>
          wi.completedAt &&
          new Date(wi.completedAt) >= weekStart &&
          new Date(wi.completedAt) < weekEnd,
      ).length,
    };
  });

  // Resolution time per item
  const avgCycleDays = Number((avgCycleTimeHours / 24).toFixed(1));
  const timePerItemData = doneItemsWithTime.map((wi) => {
    const totalHours =
      (wi.timeInProgress ?? 0) +
      (wi.timeInReview ?? 0) +
      (wi.timeInValidation ?? 0);
    return {
      task:
        wi.title.length > 15 ? wi.title.substring(0, 15) + "..." : wi.title,
      days: Number((totalHours / 24).toFixed(1)),
      avg: avgCycleDays,
    };
  });

  // Time in stages
  const avgInProgress = doneItemsWithTime.length
    ? doneItemsWithTime.reduce((acc, wi) => acc + (wi.timeInProgress ?? 0), 0) /
      doneItemsWithTime.length
    : 0;
  const avgInReview = doneItemsWithTime.length
    ? doneItemsWithTime.reduce((acc, wi) => acc + (wi.timeInReview ?? 0), 0) /
      doneItemsWithTime.length
    : 0;
  const timeInStagesData = [
    {
      stage: "In Progress",
      hours: Number(avgInProgress.toFixed(1)),
      fill: "#f59e0b",
    },
    {
      stage: "Review",
      hours: Number(avgInReview.toFixed(1)),
      fill: "#8b5cf6",
    },
  ].filter((s) => s.hours > 0);

  return {
    throughput,
    avgCycleTimeDays,
    activeBugsCount,
    cumulativeFlowData,
    wipByStatusData,
    typeDistributionData,
    weeklyThroughputData,
    timePerItemData,
    timeInStagesData,
  };
}

// ─── PHASE / CASCADE ─────────────────────────────────────────────────────────

export function getCascadeMetrics(
  projectId: string,
  phases: PhaseMock[],
  workItems: WorkItemMock[],
) {
  const projectPhases = phases.filter((p) => p.projectId === projectId);
  const projectItems = workItems.filter((wi) => wi.projectId === projectId);
  const doneItems = projectItems.filter(
    (wi) => wi.status === "DONE" || wi.status === "CLOSED",
  );
  const doneItemsWithTime = doneItems.filter((wi) => wi.timeInProgress);

  // Overall Progress %
  const progressPercentage =
    projectItems.length > 0
      ? Math.round((doneItems.length / projectItems.length) * 100)
      : 0;

  // Phases summary
  const completedPhases = projectPhases.filter(
    (p) => p.status === "COMPLETED",
  ).length;
  const totalPhases = projectPhases.length;
  const phasesCompletedText = `${completedPhases} of ${totalPhases} phases completed`;

  // Average Lead Time
  const avgLeadTimeHours =
    doneItemsWithTime.length > 0
      ? doneItemsWithTime.reduce(
          (acc, wi) =>
            acc +
            (wi.timeInProgress ?? 0) +
            (wi.timeInReview ?? 0) +
            (wi.timeInValidation ?? 0),
          0,
        ) / doneItemsWithTime.length
      : 0;
  const avgLeadTimeDays = (avgLeadTimeHours / 24).toFixed(0);

  // Active Bugs
  const activeBugsCount = projectItems.filter(
    (wi) =>
      wi.type === "BUG" && wi.status !== "DONE" && wi.status !== "CLOSED",
  ).length;

  // Phase scope vs delivered (reuses BurnupChart shape)
  const phaseProgressData = projectPhases.map((phase) => {
    const phaseItems = projectItems.filter((wi) => wi.phaseId === phase.id);
    return {
      day: phase.name,
      scope: phaseItems.length,
      completed: phaseItems.filter(
        (wi) => wi.status === "DONE" || wi.status === "CLOSED",
      ).length,
    };
  });

  // Active items (in-progress / in-review) per phase (reuses WipChart shape)
  const activeItemsByPhaseData = projectPhases.map((phase) => ({
    sprint: phase.name,
    wip: projectItems.filter(
      (wi) =>
        wi.phaseId === phase.id &&
        wi.status !== "DONE" &&
        wi.status !== "CLOSED" &&
        wi.status !== "TO_DO",
    ).length,
  }));

  // Scope status (reuses PointsStatusChart shape)
  const totalPoints = projectItems.reduce(
    (acc, wi) => acc + (wi.storyPoints ?? 0),
    0,
  );
  const deliveredPoints = doneItems.reduce(
    (acc, wi) => acc + (wi.storyPoints ?? 0),
    0,
  );
  const inProgressPoints = projectItems
    .filter(
      (wi) =>
        wi.status === "IN_PROGRESS" ||
        wi.status === "IN_REVIEW" ||
        wi.status === "IN_VALIDATION",
    )
    .reduce((acc, wi) => acc + (wi.storyPoints ?? 0), 0);
  const remainingPoints = Math.max(
    0,
    totalPoints - deliveredPoints - inProgressPoints,
  );
  const scopeStatusData = [
    { name: "Delivered", value: deliveredPoints, fill: "#22c55e" },
    { name: "In Progress", value: inProgressPoints, fill: "#f59e0b" },
    { name: "Remaining", value: remainingPoints, fill: "rgb(100 104 120)" },
  ].filter((d) => d.value > 0);

  // Average time per completed item per phase (reuses AvgTimeChart shape)
  const avgTimePerPhaseData = projectPhases.map((phase) => {
    const phaseDoneItems = doneItemsWithTime.filter(
      (wi) => wi.phaseId === phase.id,
    );
    const avgHours =
      phaseDoneItems.length > 0
        ? phaseDoneItems.reduce(
            (acc, wi) =>
              acc +
              (wi.timeInProgress ?? 0) +
              (wi.timeInReview ?? 0) +
              (wi.timeInValidation ?? 0),
            0,
          ) / phaseDoneItems.length
        : 0;
    return {
      sprint: phase.name,
      time: Number((avgHours / 24).toFixed(1)),
    };
  });

  // Resolution time per item
  const avgLeadDays = Number((avgLeadTimeHours / 24).toFixed(1));
  const timePerItemData = doneItemsWithTime.map((wi) => {
    const totalHours =
      (wi.timeInProgress ?? 0) +
      (wi.timeInReview ?? 0) +
      (wi.timeInValidation ?? 0);
    return {
      task:
        wi.title.length > 15 ? wi.title.substring(0, 15) + "..." : wi.title,
      days: Number((totalHours / 24).toFixed(1)),
      avg: avgLeadDays,
    };
  });

  // Time in stages
  const avgInProgress = doneItemsWithTime.length
    ? doneItemsWithTime.reduce((acc, wi) => acc + (wi.timeInProgress ?? 0), 0) /
      doneItemsWithTime.length
    : 0;
  const avgInReview = doneItemsWithTime.length
    ? doneItemsWithTime.reduce((acc, wi) => acc + (wi.timeInReview ?? 0), 0) /
      doneItemsWithTime.length
    : 0;
  const avgInValidation = doneItemsWithTime.length
    ? doneItemsWithTime.reduce(
        (acc, wi) => acc + (wi.timeInValidation ?? 0),
        0,
      ) / doneItemsWithTime.length
    : 0;
  const timeInStagesData = [
    {
      stage: "In Progress",
      hours: Number(avgInProgress.toFixed(1)),
      fill: "#f59e0b",
    },
    {
      stage: "Review",
      hours: Number(avgInReview.toFixed(1)),
      fill: "#8b5cf6",
    },
    {
      stage: "Validation",
      hours: Number(avgInValidation.toFixed(1)),
      fill: "#06b6d4",
    },
  ].filter((s) => s.hours > 0);

  return {
    progressPercentage,
    phasesCompletedText,
    completedPhases,
    totalPhases,
    avgLeadTimeDays,
    activeBugsCount,
    phaseProgressData,
    activeItemsByPhaseData,
    scopeStatusData,
    avgTimePerPhaseData,
    timePerItemData,
    timeInStagesData,
  };
}

// ─── RELEASE (Incremental / Spiral) ──────────────────────────────────────────

export function getReleaseMetrics(
  projectId: string,
  releases: ReleaseMock[],
  workItems: WorkItemMock[],
) {
  const projectReleases = releases.filter((r) => r.projectId === projectId);
  const projectItems = workItems.filter((wi) => wi.projectId === projectId);
  const doneItems = projectItems.filter(
    (wi) => wi.status === "DONE" || wi.status === "CLOSED",
  );
  const doneItemsWithTime = doneItems.filter((wi) => wi.timeInProgress);

  // Current release (IN_PROGRESS)
  const currentRelease = projectReleases.find(
    (r) => r.status === "IN_PROGRESS",
  );
  const currentReleaseItems = currentRelease
    ? projectItems.filter((wi) => wi.releaseId === currentRelease.id)
    : [];
  const currentReleaseDone = currentReleaseItems.filter(
    (wi) => wi.status === "DONE" || wi.status === "CLOSED",
  );
  const currentReleaseProgress =
    currentReleaseItems.length > 0
      ? Math.round((currentReleaseDone.length / currentReleaseItems.length) * 100)
      : 0;

  // Releases delivered
  const releasesDelivered = projectReleases.filter(
    (r) => r.status === "RELEASED",
  ).length;
  const totalReleases = projectReleases.length;

  // Average Lead Time
  const avgLeadTimeHours =
    doneItemsWithTime.length > 0
      ? doneItemsWithTime.reduce(
          (acc, wi) =>
            acc +
            (wi.timeInProgress ?? 0) +
            (wi.timeInReview ?? 0) +
            (wi.timeInValidation ?? 0),
          0,
        ) / doneItemsWithTime.length
      : 0;
  const avgLeadTimeDays = (avgLeadTimeHours / 24).toFixed(0);

  // Active Bugs
  const activeBugsCount = projectItems.filter(
    (wi) =>
      wi.type === "BUG" && wi.status !== "DONE" && wi.status !== "CLOSED",
  ).length;

  // Scope per release (reuses BurnupChart shape)
  const releaseProgressData = projectReleases.map((release) => {
    const releaseItems = projectItems.filter(
      (wi) => wi.releaseId === release.id,
    );
    return {
      day: release.name,
      scope: releaseItems.length,
      completed: releaseItems.filter(
        (wi) => wi.status === "DONE" || wi.status === "CLOSED",
      ).length,
    };
  });

  // Active items per release (reuses WipChart shape)
  const activeItemsByReleaseData = projectReleases.map((release) => ({
    sprint: release.name,
    wip: projectItems.filter(
      (wi) =>
        wi.releaseId === release.id &&
        wi.status !== "DONE" &&
        wi.status !== "CLOSED" &&
        wi.status !== "TO_DO",
    ).length,
  }));

  // Item type distribution (reuses PointsStatusChart shape)
  const typeDistributionData = [
    {
      name: "Stories",
      value: projectItems.filter((wi) => wi.type === "STORY").length,
      fill: "#3b82f6",
    },
    {
      name: "Tasks",
      value: projectItems.filter((wi) => wi.type === "TASK").length,
      fill: "rgb(100 104 120)",
    },
    {
      name: "Bugs",
      value: projectItems.filter((wi) => wi.type === "BUG").length,
      fill: "rgb(234 60 44)",
    },
    {
      name: "Spikes",
      value: projectItems.filter((wi) => wi.type === "SPIKE").length,
      fill: "rgb(147 51 234)",
    },
    {
      name: "Tech Debt",
      value: projectItems.filter((wi) => wi.type === "TECH_DEBT").length,
      fill: "rgb(244 180 0)",
    },
  ].filter((d) => d.value > 0);

  // Average time per release (reuses AvgTimeChart shape)
  const avgTimePerReleaseData = projectReleases.map((release) => {
    const releaseDoneItems = doneItemsWithTime.filter(
      (wi) => wi.releaseId === release.id,
    );
    const avgHours =
      releaseDoneItems.length > 0
        ? releaseDoneItems.reduce(
            (acc, wi) =>
              acc +
              (wi.timeInProgress ?? 0) +
              (wi.timeInReview ?? 0) +
              (wi.timeInValidation ?? 0),
            0,
          ) / releaseDoneItems.length
        : 0;
    return {
      sprint: release.version,
      time: Number((avgHours / 24).toFixed(1)),
    };
  });

  // Resolution time per item
  const avgLeadDays = Number((avgLeadTimeHours / 24).toFixed(1));
  const timePerItemData = doneItemsWithTime.map((wi) => {
    const totalHours =
      (wi.timeInProgress ?? 0) +
      (wi.timeInReview ?? 0) +
      (wi.timeInValidation ?? 0);
    return {
      task:
        wi.title.length > 15 ? wi.title.substring(0, 15) + "..." : wi.title,
      days: Number((totalHours / 24).toFixed(1)),
      avg: avgLeadDays,
    };
  });

  // Time in stages
  const avgInProgress = doneItemsWithTime.length
    ? doneItemsWithTime.reduce((acc, wi) => acc + (wi.timeInProgress ?? 0), 0) /
      doneItemsWithTime.length
    : 0;
  const avgInReview = doneItemsWithTime.length
    ? doneItemsWithTime.reduce((acc, wi) => acc + (wi.timeInReview ?? 0), 0) /
      doneItemsWithTime.length
    : 0;
  const avgInValidation = doneItemsWithTime.length
    ? doneItemsWithTime.reduce(
        (acc, wi) => acc + (wi.timeInValidation ?? 0),
        0,
      ) / doneItemsWithTime.length
    : 0;
  const timeInStagesData = [
    {
      stage: "In Progress",
      hours: Number(avgInProgress.toFixed(1)),
      fill: "#f59e0b",
    },
    {
      stage: "Review",
      hours: Number(avgInReview.toFixed(1)),
      fill: "#8b5cf6",
    },
    {
      stage: "Validation",
      hours: Number(avgInValidation.toFixed(1)),
      fill: "#06b6d4",
    },
  ].filter((s) => s.hours > 0);

  return {
    currentReleaseProgress,
    currentRelease,
    releasesDelivered,
    totalReleases,
    avgLeadTimeDays,
    activeBugsCount,
    releaseProgressData,
    activeItemsByReleaseData,
    typeDistributionData,
    avgTimePerReleaseData,
    timePerItemData,
    timeInStagesData,
  };
}
