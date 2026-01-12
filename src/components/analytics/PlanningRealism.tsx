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
      <div className="bg-white rounded-[24px] p-6 text-sm text-gray-500">
        No planning data available for this period.
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#2D3748",
                marginBottom: "8px",
              }}
            >
              Planning Realism
            </h3>
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#718096" }}>
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
            stroke="#718096"
            style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px" }}
            tickLine={false}
          />
          <YAxis
            stroke="#718096"
            style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px" }}
            tickLine={false}
            label={{
              value: "Sessions",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#718096", fontFamily: "Manrope, sans-serif" },
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
              fontFamily: "Manrope, sans-serif",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "14px",
            }}
          />
          <Bar
            dataKey="scheduled"
            fill="#E5D7CF"
            radius={[8, 8, 0, 0]}
            name="Scheduled"
          />
          <Bar
            dataKey="completed"
            fill="#C8B6E2"
            radius={[8, 8, 0, 0]}
            name="Completed"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
