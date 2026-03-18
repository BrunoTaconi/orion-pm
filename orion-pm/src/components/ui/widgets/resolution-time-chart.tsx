import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MAX_LABEL_LENGTH = 10;

function TruncatedTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  const raw = payload?.value ?? "";
  const label = raw.length > MAX_LABEL_LENGTH ? `${raw.slice(0, MAX_LABEL_LENGTH)}…` : raw;
  return (
    <g transform={`translate(${x},${y})`}>
      <title>{raw}</title>
      <text x={0} y={0} dy={12} textAnchor="middle" fill="var(--text-secondary)" fontSize={12}>
        {label}
      </text>
    </g>
  );
}

interface ResolutionTimeChartProps {
  title: string;
  subtitle?: string;
  data?: { task: string; days: number; avg: number }[];
}

const tooltipStyle = {
  backgroundColor: "var(--bg-primary, #ffffff)",
  borderColor: "var(--border, #e5e7eb)",
  borderRadius: "8px",
  color: "var(--text-primary, #111827)",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
  fontSize: "12px",
  padding: "8px 12px",
};

export function ResolutionTimeChart({ title, subtitle, data }: ResolutionTimeChartProps) {
  return (
    <div className="bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col hover:border-blue-200 transition-colors">
      <div className="mb-6">
        <h3 className="font-bold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary">{subtitle}</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
              opacity={0.5}
            />
            <XAxis
              dataKey="task"
              stroke="var(--text-secondary)"
              tickLine={false}
              axisLine={false}
              tick={<TruncatedTick />}
            />
            <YAxis
              stroke="var(--text-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "var(--border, #f3f4f6)", opacity: 0.4 }}
              contentStyle={tooltipStyle}
              formatter={(value, name) => {
                if (name === "Average") return [`${value} days`, name];
                return [`${value} days`, "Time spent"];
              }}
            />
            <Bar dataKey="days" name="Time spent" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
            <Line
              type="monotone"
              dataKey="avg"
              name="Average"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
