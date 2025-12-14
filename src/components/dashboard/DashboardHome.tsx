import { useEffect, useState } from "react";
import { Clock, TrendingUp, Zap, Calendar, PlayCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDashboard } from "../../hooks/useDashboard";

type session = {
  id: number;
  title: string;
  start_at: string; //eg 2025-11-21109:00:00.000Z
  end_at: string | null;
  status: string;
  break_time: number | 0;
  tag: {
    id: string;
    name: string;
    color: string;
  };
};

type weeklyDay = {
  date: string;
  focus_minutes: number;
};

type weeklyProgress = {
  scheduled_count: number;
  completed_count: number;
};

function getWeekDay(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", { weekday: "short" });
}

function getStartAt(dateString: string) {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const mockWeeklyData: weeklyDay[] = [
  {
    date: "2025-11-17",
    focus_minutes: 16,
  },
  {
    date: "2025-11-18",
    focus_minutes: 25,
  },
  {
    date: "2025-11-19",
    focus_minutes: 40,
  },
];

const mockTodaySession: session[] = [
  {
    id: 1,
    title: "Morning Deep Work",
    start_at: "2025-11-21T09:00:00.000Z",
    end_at: "2025-11-21T10:30:00.000Z",
    status: "COMPLETED",
    break_time: 10,
    tag: {
      id: "a1b2c3",
      name: "Work",
      color: "#4A90E2",
    },
  },
  {
    id: 2,
    title: "Study Session",
    start_at: "2025-11-21T13:00:00.000Z",
    end_at: null,
    status: "SCHDULED",
    break_time: 0,
    tag: {
      id: "d4e5f6",
      name: "Study",
      color: "#7ED321",
    },
  },
  {
    id: 3,
    title: "Gym Training",
    start_at: "2025-11-21T17:00:00.000Z",
    end_at: "2025-11-21T18:00:00.000Z",
    status: "SCHEDULED",
    break_time: 5,
    tag: {
      id: "g7h8i9",
      name: "Health",
      color: "#F5A623",
    },
  },
];

const mockWeeklyProgress: weeklyProgress = {
  scheduled_count: 3,
  completed_count: 1,
};
const weeklyData = mockWeeklyData.map((item) => ({
  ...item,
  day: getWeekDay(item.date),
}));
export default function Dashboard() {
  //Time State
  const [currentTime, setCurrentTime] = useState(() => new Date());

  //Quote state
  const quote = "Focus is the gateway to thinking clearly.";

  // Timer effect - rerender update time displayed every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1000ms / 1 sec

    return () => clearInterval(timer); // cleanup when component disapears;
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Acculumate all session minutes for the week
  const totalWeekMinutes = mockWeeklyData.reduce(
    (sum, day) => sum + day.focus_minutes,
    0
  );

  // Convert weekly progress to percentage
  //   const weekProgress = Math.round(
  //     (mockWeeklyProgress.completed_count / mockWeeklyProgress.scheduled_count) *
  //       100
  //   );

  const { data, isLoading, error } = useDashboard();

  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>Failed to load dashboard.</p>;
  const user = data!.data.user;

  const weekProgress = data!.data.week_progress;
  const weeklyActivities = data!.data.weekly_activities;
  const today = data!.data.today;

  return (
    // Page layout
    <div className="min-h-screen px-6">
      {/* Content layout*/}
      <div className="mx-auto max=w-[1200px] py-10">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-semibold mb-2 text-textPrimary">
                  Welcome back (user name)
                </h1>

                <p className="text-textSecondary">{formatDate(currentTime)}</p>
              </div>

              <div className="text-right">
                <div className="mb-2 flex items-center gap-2">
                  <Clock
                    className="h-6 w-6"
                    style={{ color: "var(--soft-blue)" }}
                  />
                  <h2 className="text-textPrimary">
                    {formatTime(currentTime)}
                  </h2>
                </div>
                <p className="text-textSecondary">Live</p>
              </div>
            </div>

            <div
              className="mt-6 rounded-2xl p-6"
              style={{ backgroundColor: "var(--soft-blue-light)" }}
            >
              <p className="italic text-textPrimary">"{quote}"</p>
            </div>
          </div>
        </div>

        {/* Stats grid*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Week Progress */}
          <div className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
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
                {(weekProgress.completed_count / weekProgress.scheduled_count) *
                  100}
                %
              </div>
              <p className="text-textSecondary">
                {mockWeeklyProgress.completed_count} of{" "}
                {mockWeeklyProgress.scheduled_count} days completed
              </p>
            </div>

            <div
              className="h-2 overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--warm-neutral)" }}
            >
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${weekProgress}%`,
                  backgroundColor: "var(--accent-purple)",
                }}
              />
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="rounded-full p-3"
                style={{ backgroundColor: "var(--soft-blue-light)" }}
              >
                <Zap
                  className="h-6 w-6"
                  style={{ color: "var(--soft-blue)" }}
                />
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
                {totalWeekMinutes}
              </div>
              <p className="text-textSecondary">total minutes this week</p>
            </div>

            <p className="text-[var(--accent-purple)]">↑ 12% from last week</p>
          </div>

          {/* Today's Sessions */}
          <div className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
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
                {mockTodaySession.length}
              </div>
              <p className="text-textSecondary">sessions scheduled</p>
            </div>
          </div>
        </div>

        {/* Activity Graph */}
        <div className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-10">
          <h3 className="text-2xl font-semibold mb-6 text-textPrimary">
            This Week's Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
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
        </div>

        {/* Scheduled Sessions */}
        <div className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <h3 className="text-2xl font-semibold mb-6 text-textPrimary">
            Today's Sessions
          </h3>
          <div className="space-y-4">
            {mockTodaySession.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-5 rounded-2xl"
                style={{ backgroundColor: "var(--warm-neutral)" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="rounded-full p-3"
                    style={{
                      backgroundColor: session.tag.color,
                    }}
                  >
                    <Calendar
                      className="w-5 h-5"
                      style={{ color: "var(--text-primary)" }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-textPrimary">
                      {session.title}
                    </h3>
                    <p className="text-textSecondary">
                      {getStartAt(session.start_at)}
                    </p>
                  </div>
                </div>
                <button
                  //onClick={}
                  className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
                  style={{
                    backgroundColor: "var(--soft-blue)",
                    color: "white",
                  }}
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Start</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
