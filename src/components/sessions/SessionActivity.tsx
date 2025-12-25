import { useState } from "react";
import type { SessionAndTag } from "../../types/session";
import { Clock, Coffee } from "lucide-react";
import { formatSecToMin, formatTime } from "../../lib/utils";

interface SessionActivityProps {
  timeSpent: number;
  breakCount: number;
  breakDuration: number;
  distractions: string[];
  onAddDistraction: (distraction: string) => void;
}

export function SessionActivity({
  timeSpent,
  breakCount,
  breakDuration,
  distractions,
  onAddDistraction,
}: SessionActivityProps) {
  const [newDistraction, setNewDistraction] = useState("");
  const handleAddDistraction = () => {
    // Check distraction is not just whitespaces
    if (newDistraction.trim()) {
      //Add distraction to db
      onAddDistraction(newDistraction.trim());
      //Clear input after submit
      setNewDistraction("");
    }
  };

  const stats = [
    {
      icon: Clock,
      label: "Time Spent",
      value: formatSecToMin(timeSpent),
      color: "var(--soft-blue)",
    },
    {
      icon: Coffee,
      label: "Breaks",
      value: breakCount.toString(),
      color: "var(--accent-purple)",
    },
    {
      icon: Clock,
      label: "Break Duration",
      value: formatSecToMin(breakDuration),
      color: "var(--accent-purple)",
    },
  ];
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-3xl shadow-xl"
              style={{
                backgroundColor: "var(--off-white)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: stat.color + "20" }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div>
                  <div
                    style={{ fontSize: "14px", color: "var(--text-secondary)" }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {stat.value}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
