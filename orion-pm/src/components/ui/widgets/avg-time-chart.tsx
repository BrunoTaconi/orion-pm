import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AvgTimeChartProps {
  title: string;
  subtitle?: string;
  data?: { sprint: string; time: number }[];
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

export function AvgTimeChart({ title, subtitle, data }: AvgTimeChartProps) {
  return (
    <div className="bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col hover:border-blue-200 transition-colors">
      <div className="mb-6">
        <h3 className="font-bold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary">{subtitle}</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data?.slice(-10)} margin={{ left: -20 }}>
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
              cursor={{ fill: "var(--border, #f3f4f6)", opacity: 0.4 }}
              contentStyle={tooltipStyle}
            />
            <Bar dataKey="time" name="Days" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
