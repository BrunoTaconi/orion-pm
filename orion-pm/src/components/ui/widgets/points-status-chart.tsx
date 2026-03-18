import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PointsStatusChartProps {
  title: string;
  subtitle?: string;
  data?: { name: string; value: number; fill: string }[];
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

export function PointsStatusChart({ title, subtitle, data }: PointsStatusChartProps) {
  return (
    <div className="bg-bg-primary border border-border rounded-xl p-6 shadow-sm flex flex-col hover:border-blue-200 transition-colors">
      <div className="mb-6">
        <h3 className="font-bold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary">{subtitle}</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 0 }}>
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
            <Tooltip
              cursor={{ fill: "var(--border, #f3f4f6)", opacity: 0.4 }}
              contentStyle={tooltipStyle}
            />
            <Bar dataKey="value" name="Pontos" radius={[0, 4, 4, 0]} barSize={20}>
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
