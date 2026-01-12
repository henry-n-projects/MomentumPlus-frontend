import { Flame, TrendingUp, CircleCheck, Target } from "lucide-react";
import { AnalyticsCard } from "../components/analytics/AnalyticsCard";
import { FocusTimeByTag } from "../components/analytics/FocusTimeByTag";
import { PlanningRealism } from "../components/analytics/PlanningRealism";
import { FocusEfficiency } from "../components/analytics/FocusEfficiency";
import { FocusBalance } from "../components/analytics/FocusBalance";
import { FocusConsistency } from "../components/analytics/FocusConsistency";
import { useAnalytics } from "../hooks/useAnalytics";
import { TimePeriodSelector } from "../components/analytics/TimePeriodSelector";
import { useMemo, useState } from "react";
import { time } from "motion";
// Mock data for the analytics dashboard - Week
const weekData = {
  focusTimeByTag: [
    { name: "Work", value: 42, color: "#A3C9E0" },
    { name: "Study", value: 28, color: "#C8B6E2" },
    { name: "Personal", value: 18, color: "#E5D7CF" },
    { name: "Exercise", value: 12, color: "#D9ECF2" },
  ],
  focusConsistency: [
    { date: "Mon", hours: 3.5 },
    { date: "Tue", hours: 4.2 },
    { date: "Wed", hours: 3.8 },
    { date: "Thu", hours: 5.1 },
    { date: "Fri", hours: 4.5 },
    { date: "Sat", hours: 2.8 },
    { date: "Sun", hours: 3.2 },
  ],
  focusBalance: [
    { tag: "Work", hours: 42, target: 40 },
    { tag: "Study", hours: 28, target: 30 },
    { tag: "Personal", hours: 18, target: 20 },
    { tag: "Exercise", hours: 12, target: 10 },
  ],

  stats: {
    streak: "12 days",
    streakTrend: "+3 days",
    completionRate: "87%",
    completionTrend: "+5%",
    completedSessions: "156",
    focusTime: "48h",
    focusTimeTrend: "+12h",
    focusMinutes: 1620,
    breakMinutes: 480,
  },
};

// Mock data for 30 days
const monthData = {
  focusTimeByTag: [
    { name: "Work", value: 156, color: "#A3C9E0" },
    { name: "Study", value: 98, color: "#C8B6E2" },
    { name: "Personal", value: 64, color: "#E5D7CF" },
    { name: "Exercise", value: 42, color: "#D9ECF2" },
  ],
  focusConsistency: [
    { date: "Week 1", hours: 22 },
    { date: "Week 2", hours: 26 },
    { date: "Week 3", hours: 28 },
    { date: "Week 4", hours: 24 },
  ],
  focusBalance: [
    { tag: "Work", hours: 156, target: 160 },
    { tag: "Study", hours: 98, target: 100 },
    { tag: "Personal", hours: 64, target: 60 },
    { tag: "Exercise", hours: 42, target: 40 },
  ],

  stats: {
    streak: "12 days",
    streakTrend: "+8 days",
    completionRate: "89%",
    completionTrend: "+7%",
    completedSessions: "156",
    focusTime: "120h",
    focusTimeTrend: "+28h",
    focusMinutes: 5400,
    breakMinutes: 1800,
  },
};

type TimePeriod = "week" | "month";

const PeriodToDays: Record<TimePeriod, number> = {
  week: 7,
  month: 30,
};
export default function App() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("week");
  const days = PeriodToDays[timePeriod];
  const { data } = useAnalytics(days);

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
            <h1
              className="text-4xl font-bold text-[var(--text-primary)] mb-8"
              style={{
                marginBottom: "8px",
              }}
            >
              Pomodoro Analytics
            </h1>
            <p className="text-base font-normal text-[var(--text-secondary)]">
              Track your focus patterns and productivity insights
            </p>
          </div>
          <TimePeriodSelector selected={timePeriod} onChange={setTimePeriod} />
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
            subtitle={`from last ${days} days`}
          />

          <AnalyticsCard
            title="Completed Sessions"
            value={data?.data.summary.completed_sessions || 0}
            icon={
              <CircleCheck size={24} style={{ color: "var(--accent-green)" }} />
            }
            subtitle={`from last ${days} days`}
          />

          <AnalyticsCard
            title="Total Focus Time"
            value={
              data ? Math.round(data.data.summary.total_minutes * 10) / 10 : 0
            }
            icon={
              <TrendingUp size={24} style={{ color: "var(--accent-purple" }} />
            }
            subtitle={`minutes from last ${days} days`}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <FocusTimeByTag data={focusTimeByTagData} />
          {/* <FocusBalance data={} /> */}
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
        {/* <FocusConsistency data={} /> */}
      </div>
    </div>
  );
}
