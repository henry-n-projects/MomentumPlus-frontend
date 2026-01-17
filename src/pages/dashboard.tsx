import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useDashboard } from "../hooks/useDashboard";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { TodaySessionList } from "../components/dashboard/SessionList";
import { ActivityGraph } from "../components/dashboard/ActivityGraph";
import StatsGrid from "../components/dashboard/StatsGrid";
import { formatDate, formatTime } from "../lib/utils";

export default function Dashboard() {
  const { data: user } = useCurrentUser();
  //Time State
  const [currentTime, setCurrentTime] = useState(() => new Date());

  // Timer effect - rerender update time displayed every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1000ms / 1 sec

    return () => clearInterval(timer); // cleanup when component disapears;
  }, []);

  const { data, isLoading, error } = useDashboard();

  if (isLoading || !data) {
    return null;
  }
  if (error) return <p>Failed to load dashboard.</p>;
  const weekProgress = data!.data.week_progress;
  const weeklyActivities = data!.data.weekly_activities;
  const todaySessions = data!.data.today.sessions;
  const todayCount = todaySessions.length;
  const completionRate =
    weekProgress.scheduled_count === 0
      ? 0
      : Math.round(
          (weekProgress.completed_count / weekProgress.scheduled_count) * 100
        );
  const weeklyFocusMinutes = Math.ceil(
    weeklyActivities.reduce((sum, day) => sum + day.focus_minutes, 0)
  );
  const weekly_activities = weeklyActivities.map((a) => ({
    date: a.date,
    focus_minutes: Math.ceil(a.focus_minutes),
  }));

  return (
    // Page layout

    <div className="min-h-screen px-6 ">
      {/* Content layout*/}

      <div className="relative mx-auto max-w-[1200px] py-10">
        {/* Welcome Section */}

        <div className="mb-10">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2 mb-2 text-textPrimary">
                Welcome back {user?.name}
              </h1>

              <p className=" text-xl text-textSecondary">
                {formatDate(currentTime)}
              </p>
            </div>

            <div className="text-right">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-6 w-6 text-[var(--soft-blue)]" />
                <h2 className="text-xl text-textPrimary">
                  {formatTime(currentTime)}
                </h2>
              </div>
              <p className="text-xl text-textSecondary">Live</p>
            </div>
          </div>
        </div>

        <StatsGrid
          completionRate={completionRate}
          weekProgress={weekProgress}
          weeklyFocusMinutes={weeklyFocusMinutes}
          todayCount={todayCount}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <ActivityGraph weeklyActivity={weekly_activities} />
          </div>
          <div className="w-full md:w-1/2">
            <TodaySessionList todaySessions={todaySessions} />
          </div>
        </div>
      </div>
    </div>
  );
}
