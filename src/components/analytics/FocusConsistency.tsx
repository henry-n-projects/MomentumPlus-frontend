import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface FocusConsistencyProps {
  data: Array<{
    date: string;
    focus_minutes: number;
  }>;
}

export function FocusConsistency({ data }: FocusConsistencyProps) {
  return (
    <div
      className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="mb-6">
        <h3
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#2D3748",
            marginBottom: "8px",
          }}
        >
          Focus Consistency Over Time
        </h3>
        <p style={{ fontSize: "14px", fontWeight: 400, color: "#718096" }}>
          Your daily focus patterns show a strong upward trend
        </p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A3C9E0" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#A3C9E0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5D7CF"
            strokeOpacity={0.3}
          />
          <XAxis
            dataKey="date"
            stroke="#718096"
            style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px" }}
            tickLine={false}
          />
          <YAxis
            stroke="#718096"
            style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px" }}
            tickLine={false}
            label={{
              value: "Minutes",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#718096", fontFamily: "Manrope, sans-serif" },
            }}
          />
          <Tooltip
            formatter={(value: number) => [`${value} minutes`, "Focus Time"]}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              padding: "12px",
              fontFamily: "Manrope, sans-serif",
            }}
          />
          <Area
            type="monotone"
            dataKey="focus_minutes"
            stroke="#A3C9E0"
            strokeWidth={3}
            fill="url(#colorHours)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
