import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface WipChartProps {
  title: string;
  subtitle?: string;
  data?: { sprint: string; wip: number }[];
}
export function WipChart({ title, subtitle, data }: WipChartProps) {
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
    <div className="bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col hover:border-blue-200 transition-colors">
      <div className="mb-6">
        <h3 className="font-bold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary">{subtitle}</p>
      </div>
      <div className="h-64 w-full focus:outline-none focus-visible:outline-none">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            style={{ outline: "none" }}
          >
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
              dy={10}
            />
            <YAxis
              stroke="var(--text-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dx={-10}
              domain={["dataMin - 2", "dataMax + 2"]}
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
              name="Simultaneous Tasks"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 0 }}
              activeDot={{
                r: 6,
                fill: "#8b5cf6",
                stroke: "var(--bg-primary)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
