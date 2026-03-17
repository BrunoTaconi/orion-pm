"use client";

import { Icons } from "@/components/icons";
import {
  ComparisonStatCard,
  NumericStatCard,
  ProgressStatCard,
} from "@/components/ui/widgets";
import { reportMocks, sprintsMock, workItemsMock } from "@/mocks/mock";
import { use, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  ReferenceLine,
  Area,
} from "recharts";

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

  // ESTILOS MELHORADOS DO TOOLTIP (Hover Clean)
  const tooltipStyle = {
    backgroundColor: "var(--bg-primary, #ffffff)",
    borderColor: "var(--border, #e5e7eb)",
    borderRadius: "8px",
    color: "var(--text-primary, #111827)",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
    fontSize: "12px",
    padding: "8px 12px",
  };

  const subtleCursor = { fill: "var(--border, #f3f4f6)", opacity: 0.4 };

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

  const lastSprintTotalTasks = lastSprintTasks?.length;

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
          value={(avgLeadTime / 24).toFixed(1)}
          footerText="Days"
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
        />
      </div>

      {/* ÁREA DOS GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <div className="bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col lg:col-span-2 hover:border-blue-200 transition-colors">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h3 className="font-bold text-text-primary">Burnup Chart</h3>
              <p className="text-xs text-text-secondary">
                Escopo planejado vs. Trabalho concluído na Sprint atual.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-text-secondary">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-slate-200 border border-slate-300"></div>{" "}
                Escopo
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-blue-500"></div> Concluído
              </div>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={reportMocks.burnupData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="day"
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{
                    stroke: "var(--border)",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                  }}
                />
                <Area
                  type="stepAfter"
                  dataKey="scope"
                  name="Escopo Total (pts)"
                  fill="var(--bg-secondary)"
                  stroke="var(--border)"
                  opacity={0.6}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  name="Concluído (pts)"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#3b82f6" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div> */}

        {/* Gráfico 1: WIP (Work in Progress) */}
        <div className="bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col hover:border-blue-200 transition-colors">
          <div className="mb-6">
            <h3 className="font-bold text-text-primary">
              WIP (Work In Progress)
            </h3>
            <p className="text-xs text-text-secondary">
              Comparação da carga de trabalho ao longo das sprints.
            </p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reportMocks.wipComparison}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="sprint"
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{
                    stroke: "var(--border)",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="wip"
                  name="Tarefas Simultâneas"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#8b5cf6" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Métricas de Pontos */}
        <div className="bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col hover:border-blue-200 transition-colors">
          <div className="mb-6">
            <h3 className="font-bold text-text-primary">Status de Pontos</h3>
            <p className="text-xs text-text-secondary">
              Planejados vs. Entregues.
            </p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reportMocks.pointsMetric}
                layout="vertical"
                margin={{ left: 30 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis
                  type="number"
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <Tooltip cursor={subtleCursor} contentStyle={tooltipStyle} />
                <Bar
                  dataKey="value"
                  name="Pontos"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                >
                  {reportMocks.pointsMetric.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 3: Tempo Médio de Tarefa */}
        <div className="bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col hover:border-blue-200 transition-colors">
          <div className="mb-6">
            <h3 className="font-bold text-text-primary">
              Tempo Médio por Tarefa
            </h3>
            <p className="text-xs text-text-secondary">
              Tempo histórico gasto em dias ao longo das sprints.
            </p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportMocks.avgTimePerTask}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="sprint"
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip cursor={subtleCursor} contentStyle={tooltipStyle} />
                <Bar
                  dataKey="time"
                  name="Dias"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 4: Tempo por Item Entregue (Composto) */}
        <div className="bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col hover:border-blue-200 transition-colors">
          <div className="mb-6">
            <h3 className="font-bold text-text-primary">
              Tempo de Resolução por Item
            </h3>
            <p className="text-xs text-text-secondary">
              Dias úteis gastos por tarefa vs. Média da Sprint.
            </p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={reportMocks.timePerItem}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="task"
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={subtleCursor}
                  contentStyle={tooltipStyle}
                  formatter={(value: number, name: string) => {
                    if (name === "Média") return [`${value} dias`, name];
                    return [`${value} dias`, "Tempo gasto"];
                  }}
                />
                <Bar
                  dataKey="days"
                  name="Tempo gasto"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
                <Line
                  type="monotone"
                  dataKey="avg"
                  name="Média"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 5: Tempo por Etapa */}
        <div className="bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col lg:col-span-2 hover:border-blue-200 transition-colors">
          <div className="mb-2 text-center">
            <h3 className="font-bold text-text-primary">
              Média de Tempo por Etapa
            </h3>
            <p className="text-xs text-text-secondary">
              Onde as tarefas passam mais tempo? (Em horas)
            </p>
          </div>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reportMocks.timeInStages}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="hours"
                  nameKey="stage"
                  stroke="none"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {reportMocks.timeInStages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ ...tooltipStyle, border: "none" }}
                  itemStyle={{ color: "var(--text-primary)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
