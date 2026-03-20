import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface StageTimeChartProps {
  title: string;
  subtitle?: string;
  data?: { stage: string; hours: number; fill: string }[];
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

export function StageTimeChart({ title, subtitle, data }: StageTimeChartProps) {
  return (
    <div className="bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col lg:col-span-2 hover:border-blue-200 transition-colors">
      <div className="mb-2 text-center">
        <h3 className="font-bold text-text-primary">{title}</h3>
        <p className="text-xs text-text-secondary">{subtitle}</p>
      </div>
      <div className="h-72 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="hours"
              nameKey="stage"
              stroke="none"
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data?.map((entry, index) => (
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
  );
}
