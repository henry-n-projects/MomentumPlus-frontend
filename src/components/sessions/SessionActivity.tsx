import { useState } from "react";
import { motion } from "motion/react";
import { AlertCircle, Clock, Coffee, Plus } from "lucide-react";
import { formatSecToMin, formatTime } from "../../lib/utils";

interface SessionActivityProps {
  timeSpent: number;
  breakCount: number;
  breakDuration: number;
  distractions: string[];
  onAddDistraction: (distraction: string) => void;
  canAddDistraction: boolean;
}

export function SessionActivity({
  timeSpent,
  breakCount,
  breakDuration,
  distractions,
  onAddDistraction,
  canAddDistraction,
}: SessionActivityProps) {
  const [newDistraction, setNewDistraction] = useState("");
  const handleAddDistraction = () => {
    if (!canAddDistraction) return;
    // Check distraction is not just whitespaces
    if (newDistraction.trim()) {
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

      {/* Distractions Section */}
      <div
        className="p-6 rounded-3xl shadow-lg"
        style={{
          backgroundColor: "var(--off-white)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle
            className="w-5 h-5"
            style={{ color: "var(--text-secondary)" }}
          />
          <h3 style={{ color: "var(--text-primary)" }}>Distractions</h3>
        </div>

        {/* Add Distraction Input */}
        <div className="flex gap-2 mb-4">
          <input
            placeholder={
              canAddDistraction
                ? "Record a distraction..."
                : "Start a session to record a distraction"
            }
            value={newDistraction}
            disabled={!canAddDistraction}
            onChange={(e) => setNewDistraction(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddDistraction()}
            className="flex-1 shadow"
            style={{
              borderRadius: "12px",
              padding: 5,
              backgroundColor: "var(--warm-neutral)",
              border: "none",
            }}
          />
          <motion.button
            onClick={handleAddDistraction}
            className="px-2 rounded-full"
            whileHover={canAddDistraction ? { scale: 1.05 } : {}}
            disabled={!canAddDistraction || newDistraction.trim() === ""}
            style={{
              backgroundColor: canAddDistraction
                ? "var(--soft-blue)"
                : "var(--warm-neutral)",
              color: canAddDistraction
                ? "var(--text-primary)"
                : "var(--text-secondary)",
            }}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Distractions List */}
        {distractions.length > 0 ? (
          <div className="space-y-2">
            {distractions.map((distraction, index) => (
              <div
                key={index}
                className="p-3 rounded-xl"
                style={{
                  backgroundColor: "var(--warm-neutral)",
                  color: "var(--text-primary)",
                }}
              >
                <span style={{ fontSize: "14px" }}>{distraction}</span>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-4"
            style={{ fontSize: "14px", color: "var(--text-secondary)" }}
          >
            No distractions recorded
          </div>
        )}
      </div>
    </div>
  );
}
