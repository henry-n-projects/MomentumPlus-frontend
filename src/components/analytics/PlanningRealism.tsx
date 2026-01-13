import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PlanningRealismProps {
  data: Array<{
    day: string;
    scheduled: number;
    completed: number;
  }>;
}

export function PlanningRealism({ data }: PlanningRealismProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 text-sm text-gray-500">
        No planning data available for this period.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
              Planning Realism
            </h3>
            <p className="text-sm font-normal text-[var(--text-secondary)]">
              How your plans match reality
            </p>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5D7CF"
            strokeOpacity={0.3}
          />
          <XAxis
            dataKey="day"
            stroke="var(--text-secondary"
            style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px" }}
            tickLine={false}
          />
          <YAxis
            stroke="var(--text-secondary"
            style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px" }}
            tickLine={false}
            label={{
              value: "Sessions",
              angle: -90,
              position: "insideLeft",
              style: {
                fill: "var(--text-secondary",
              },
            }}
          />
          <Tooltip
            formatter={(value: number) => `${value} sessions`}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              padding: "12px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{
              fontSize: "14px",
            }}
          />
          <Bar
            dataKey="scheduled"
            fill="var(--warm-neutral-dark)"
            radius={[8, 8, 0, 0]}
            name="Scheduled"
          />
          <Bar
            dataKey="completed"
            fill="var(--accent-purple)"
            radius={[8, 8, 0, 0]}
            name="Completed"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
