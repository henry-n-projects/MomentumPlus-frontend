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
  const averageCompletion =
    data.reduce((acc, item) => {
      return acc + (item.completed / item.scheduled) * 100;
    }, 0) / data.length;

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
          <div className="text-right">
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#718096" }}>
              Avg. Completion
            </p>
            <p style={{ fontSize: "24px", fontWeight: 600, color: "#2D3748" }}>
              {averageCompletion.toFixed(0)}%
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
