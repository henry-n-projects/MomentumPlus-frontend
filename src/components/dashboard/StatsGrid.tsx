import { Calendar, TrendingUp, Zap } from "lucide-react";
import type { WeekProgress } from "../../types/dashboard";

type StatsGridProps = {
  completionRate: number;
  weekProgress: WeekProgress;
  weeklyFocusMinutes: number;
  todayCount: number;
};
export default function StatsGrid({
  completionRate,
  weekProgress,
  weeklyFocusMinutes,
  todayCount,
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* Week Progress */}
      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center gap-3">
          <div
            className="rounded-full p-3"
            style={{ backgroundColor: "var(--soft-blue-light)" }}
          >
            <TrendingUp
              className="h-6 w-6"
              style={{ color: "var(--soft-blue)" }}
            />
          </div>
          <h3 className=" text-2xl font-semibold text-textPrimary">
            Week Progress
          </h3>
        </div>

        <div className="mb-3">
          <div
            className="mb-1 text-5xl font-bold"
            style={{ color: "var(--accent-purple)" }}
          >
            {completionRate}%
          </div>
          <p className="text-textSecondary">
            {weekProgress.completed_count} of {weekProgress.scheduled_count}{" "}
            days completed
          </p>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full"
          style={{ backgroundColor: "var(--warm-neutral)" }}
        >
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${completionRate}%`,
              backgroundColor: "var(--accent-purple)",
            }}
          />
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center gap-3">
          <div
            className="rounded-full p-3"
            style={{ backgroundColor: "var(--soft-blue-light)" }}
          >
            <Zap className="h-6 w-6" style={{ color: "var(--soft-blue)" }} />
          </div>
          <h3 className="text-2xl font-semibold text-textPrimary">
            Weekly Activity
          </h3>
        </div>

        <div className="mb-3">
          <div
            className="mb-1 text-5xl font-bold"
            style={{ color: "var(--soft-blue)" }}
          >
            {weeklyFocusMinutes}
          </div>
          <p className="text-textSecondary">total minutes this week</p>
        </div>

        <p className="text-[var(--accent-purple)]">↑ 12% from last week</p>
      </div>

      {/* Today's Sessions */}
      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="rounded-full p-3"
            style={{ backgroundColor: "var(--warm-neutral-dark)" }}
          >
            <Calendar
              className="w-6 h-6"
              style={{ color: "var(--text-primary)" }}
            />
          </div>
          <h3 className=" text-2xl font-semibold text-textPrimary">
            Today's Schedule
          </h3>
        </div>
        <div className="mb-3">
          <div className="text-5xl font-bold mb-1 text-textPrimary">
            {todayCount}
          </div>
          <p className="text-textSecondary">sessions scheduled</p>
        </div>
      </div>
    </div>
  );
}
