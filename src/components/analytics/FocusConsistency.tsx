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
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-[var(--text-primary) mb-2]">
          Focus Consistency Over Time
        </h3>
        <p className="text-sm font-normal text-[var(--text-secondary)]">
          Your daily focus patterns show a strong upward trend
        </p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--soft-blue)"
                stopOpacity={0.3}
              />
              <stop offset="95%" stopColor="var(--soft-blue)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--warm-neutral)"
            strokeOpacity={0.3}
          />
          <XAxis
            dataKey="date"
            stroke="var(--text-secondary)"
            style={{ fontSize: "12px" }}
            tickLine={false}
          />
          <YAxis
            stroke="var(--text-secondary)"
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
            }}
          />
          <Area
            type="monotone"
            dataKey="focus_minutes"
            stroke="var(--soft-blue)"
            strokeWidth={3}
            fill="url(#colorHours)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
