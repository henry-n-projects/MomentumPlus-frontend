import { Flame, TrendingUp, CircleCheck, Target } from "lucide-react";
import { AnalyticsCard } from "../components/analytics/AnalyticsCard";
import { FocusTimeByTag } from "../components/analytics/FocusTimeByTag";
import { PlanningRealism } from "../components/analytics/PlanningRealism";
import { FocusEfficiency } from "../components/analytics/FocusEfficiency";
import { FocusConsistency } from "../components/analytics/FocusConsistency";
import { useAnalytics } from "../hooks/useAnalytics";
import { TimePeriodSelector } from "../components/analytics/TimePeriodSelector";
import { useMemo, useState } from "react";

type TimePeriod = 7 | 30 | 90;

export default function App() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(7);
  const { data } = useAnalytics(timePeriod);
  const focusTimeByTagData = useMemo(() => {
    if (!data) return [];

    return data.data.time_per_tag.map((item) => ({
      name: item.tag.name,
      value: Math.max(0, Math.round(item.focus_minutes * 10) / 10), // minutes → hours
      color: item.tag.color,
    }));
  }, [data]);

  const planningRealismData = useMemo(() => {
    if (!data) return [];

    return data.data.planning_realism.map((d) => ({
      day: new Date(`${d.day}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
      }),

      scheduled: d.scheduled,
      completed: d.completed,
    }));
  }, [data]);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-2">
              Your Analytics
            </h1>
            <p className="text-xl font-normal text-[var(--text-secondary)]">
              Track your focus patterns and productivity insights
            </p>
          </div>
          <TimePeriodSelector selected={timePeriod} onChange={setTimePeriod} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <FocusTimeByTag data={focusTimeByTagData} />

          {/*  Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <AnalyticsCard
              title="Current Streak"
              value={data?.data.summary.streak || 0}
              icon={<Flame size={24} style={{ color: "var(--accent-red)" }} />}
              subtitle={`days in a row`}
            />

            <AnalyticsCard
              title="Completion Rate"
              value={
                data
                  ? Math.round(data.data.summary.completed_rate * 1000) / 10 +
                    " %"
                  : 0
              }
              icon={<Target size={24} style={{ color: "var(--soft-blue)" }} />}
              subtitle={`from last ${timePeriod} days`}
            />

            <AnalyticsCard
              title="Completed Sessions"
              value={data?.data.summary.completed_sessions || 0}
              icon={
                <CircleCheck
                  size={24}
                  style={{ color: "var(--accent-green)" }}
                />
              }
              subtitle={`from last ${timePeriod} days`}
            />

            <AnalyticsCard
              title="Total Focus Time"
              value={
                data ? Math.round(data.data.summary.total_minutes * 10) / 10 : 0
              }
              icon={
                <TrendingUp
                  size={24}
                  style={{ color: "var(--accent-purple)" }}
                />
              }
              subtitle={`minutes from last ${timePeriod} days`}
            />
          </div>
        </div>

        {/* Planning Realism & Focus Efficiency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <PlanningRealism data={planningRealismData} />
          <FocusEfficiency
            focusMinutes={data ? data.data.focus_efficiency.focus_minutes : 0}
            breakMinutes={data ? data.data.focus_efficiency.break_minutes : 0}
          />
        </div>

        {/* Focus Consistency */}
        <FocusConsistency data={data ? data.data.focus_trend : []} />
      </div>
    </div>
  );
}
