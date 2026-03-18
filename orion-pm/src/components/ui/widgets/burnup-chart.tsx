import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface BurnupChartProps {
  title: string;
  subtitle?: string;
  firstValueLabel?: string;
  secondValueLabel?: string;
  data?: {
    day: string;
    scope: number;
    completed: number;
  }[];
  margin?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
}

export function BurnupChart({
  title,
  subtitle,
  firstValueLabel,
  secondValueLabel,
  data,
  margin: { top = 5, right = 10, left = -20, bottom = 0 } = {},
}: BurnupChartProps) {
  const tooltipStyle = {
    backgroundColor: "var(--bg-primary, #ffffff)",
    borderColor: "var(--border, #e5e7eb)",
    borderRadius: "8px",
    color: "var(--text-primary, #111827)",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
    fontSize: "12px",
    padding: "8px 12px",
  };

  return (
    <>
      <div className="bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col lg:col-span-2 hover:border-blue-200 transition-colors">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h3 className="font-bold text-text-primary">{title}</h3>
            <p className="text-sm text-text-secondary">
                {subtitle}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-text-secondary">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0 border-t-2 border-dashed border-slate-400"></div>{" "}
              {firstValueLabel}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>{" "}
              {secondValueLabel}
            </div>
          </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top, right, left, bottom }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="var(--border)"
                opacity={0.3}
              />
              <XAxis
                dataKey="day"
                stroke="var(--text-secondary)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={12}
              />
              <YAxis
                stroke="var(--text-secondary)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dx={-12}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{
                  stroke: "var(--border)",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />
              <Line
                type="monotone"
                dataKey="scope"
                name="Total Scope (pts)"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#94a3b8",
                  stroke: "var(--bg-primary)",
                  strokeWidth: 2,
                }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                name="Completed (pts)"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 0 }}
                activeDot={{
                  r: 6,
                  fill: "#6366f1",
                  stroke: "var(--bg-primary)",
                  strokeWidth: 3,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
