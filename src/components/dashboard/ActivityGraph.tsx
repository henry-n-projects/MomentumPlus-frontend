import {
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Bar,
  BarChart,
} from "recharts";
import { getWeekDay } from "../../lib/utils";
import type { WeeklyActivity } from "../../types/dashboard";
type ActivityGraphProps = {
  weeklyActivity: WeeklyActivity[];
};

export function ActivityGraph({ weeklyActivity }: ActivityGraphProps) {
  const weeklyActivities = weeklyActivity.map((item) => ({
    ...item,
    day: getWeekDay(item.date),
  }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={weeklyActivities}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5D7CF" />
        <XAxis dataKey="day" tick={{ fill: "var(--text-secondary)" }} />
        <YAxis
          tick={{ fill: "var(--text-secondary)" }}
          label={{
            value: "Minutes",
            angle: -90,
            position: "insideLeft",
            fill: "var(--text-secondary)",
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--warm-neutral)",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        />
        <Bar
          dataKey="focus_minutes"
          fill="var(--soft-blue)"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
