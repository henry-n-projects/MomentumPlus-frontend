import { Flame, TrendingUp, CircleCheck, Target } from "lucide-react";
import { AnalyticsCard } from "../components/analytics/AnalyticsCard";
import { FocusTimeByTag } from "../components/analytics/FocusTimeByTag";
import { PlanningRealism } from "../components/analytics/PlanningRealism";
import { FocusEfficiency } from "../components/analytics/FocusEfficiency";
import { FocusBalance } from "../components/analytics/FocusBalance";
import { FocusConsistency } from "../components/analytics/FocusConsistency";
// Mock data for the analytics dashboard
const focusTimeByTagData = [
  { name: "Work", value: 42, color: "#A3C9E0" },
  { name: "Study", value: 28, color: "#C8B6E2" },
  { name: "Personal", value: 18, color: "#E5D7CF" },
  { name: "Exercise", value: 12, color: "#D9ECF2" },
];

const focusConsistencyData = [
  { date: "Mon", hours: 3.5 },
  { date: "Tue", hours: 4.2 },
  { date: "Wed", hours: 3.8 },
  { date: "Thu", hours: 5.1 },
  { date: "Fri", hours: 4.5 },
  { date: "Sat", hours: 2.8 },
  { date: "Sun", hours: 3.2 },
];

const focusBalanceData = [
  { tag: "Work", hours: 42, target: 40 },
  { tag: "Study", hours: 28, target: 30 },
  { tag: "Personal", hours: 18, target: 20 },
  { tag: "Exercise", hours: 12, target: 10 },
];

const planningRealismData = [
  { day: "Mon", scheduled: 8, completed: 7 },
  { day: "Tue", scheduled: 10, completed: 9 },
  { day: "Wed", scheduled: 9, completed: 7 },
  { day: "Thu", scheduled: 12, completed: 11 },
  { day: "Fri", scheduled: 8, completed: 8 },
  { day: "Sat", scheduled: 6, completed: 4 },
  { day: "Sun", scheduled: 5, completed: 4 },
];

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#F4F2EF",
        fontFamily: "Manrope, sans-serif",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#2D3748",
              marginBottom: "8px",
            }}
          >
            Pomodoro Analytics
          </h1>
          <p style={{ fontSize: "16px", fontWeight: 400, color: "#718096" }}>
            Track your focus patterns and productivity insights
          </p>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <AnalyticsCard
            title="Current Streak"
            value="12 days"
            icon={<Flame size={24} style={{ color: "#A3C9E0" }} />}
            trend={{ value: "+3 days", isPositive: true }}
            subtitle="from last week"
          />

          <AnalyticsCard
            title="Completion Rate"
            value="87%"
            icon={<Target size={24} style={{ color: "#C8B6E2" }} />}
            trend={{ value: "+5%", isPositive: true }}
            subtitle="from last week"
          />

          <AnalyticsCard
            title="Completed Sessions"
            value="156"
            icon={<CircleCheck size={24} style={{ color: "#A3C9E0" }} />}
            subtitle="this month"
          />

          <AnalyticsCard
            title="Total Focus Time"
            value="48h"
            icon={<TrendingUp size={24} style={{ color: "#C8B6E2" }} />}
            trend={{ value: "+12h", isPositive: true }}
            subtitle="from last week"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <FocusTimeByTag data={focusTimeByTagData} />

          <div
            className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <h3
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#2D3748",
                marginBottom: "24px",
              }}
            >
              Quick Insights
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#D9ECF2" }}
                >
                  <Flame size={20} style={{ color: "#A3C9E0" }} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#2D3748",
                      marginBottom: "4px",
                    }}
                  >
                    Best Streak Ever
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#718096",
                    }}
                  >
                    Your current 12-day streak is your longest yet! Keep it up.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#E5D7CF" }}
                >
                  <Target size={20} style={{ color: "#C8B6E2" }} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#2D3748",
                      marginBottom: "4px",
                    }}
                  >
                    Most Productive Day
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#718096",
                    }}
                  >
                    Thursday was your best day with 5.1 hours of focused work.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#D9ECF2" }}
                >
                  <TrendingUp size={20} style={{ color: "#A3C9E0" }} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#2D3748",
                      marginBottom: "4px",
                    }}
                  >
                    Weekly Growth
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#718096",
                    }}
                  >
                    You've increased your focus time by 25% this week.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Balance & Planning Realism */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <FocusBalance data={focusBalanceData} />
          <PlanningRealism data={planningRealismData} />
        </div>

        {/* Focus Efficiency & Consistency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <FocusEfficiency focusMinutes={1620} breakMinutes={480} />
          <FocusConsistency data={focusConsistencyData} />
        </div>
      </div>
    </div>
  );
}
