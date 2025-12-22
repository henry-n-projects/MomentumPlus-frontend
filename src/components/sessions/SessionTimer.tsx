import type { style } from "motion/react-client";

interface SessionTimerProps {
  elapsedTime: number;
  isOnBreak: boolean;
  isRunning: boolean;
}

export function SessionTimer({
  elapsedTime,
  isOnBreak,
  isRunning,
}: SessionTimerProps) {
  const hours = Math.floor(elapsedTime / 3600); // seconds to hours
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Timer Circle */}
      <div
        className={`relative w-64 h-64 rounded-full flex items-center justify-center transition-transform ${
          isRunning ? "animate-pulse-gentle" : ""
        }`}
        style={{
          background: isOnBreak
            ? "linear-gradient(135deg, var(--accent-purple) 0%, var(--soft-blue-light) 100%)"
            : "linear-gradient(135deg, var(--soft-blue) 0%, var(--accent-purple) 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        {/* Space in the ring */}
        <div
          className="absolute inset-3 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "var(--warm-neutral)" }}
        >
          <div className="text-center">
            <div
              style={{
                fontSize: "56px",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {/* Time count label */}
              {hours > 0
                ? `${hours}:${String(minutes).padStart(2, "0")}:${String(
                    seconds
                  ).padStart(2, "0")}`
                : `${String(minutes).padStart(2, "0")}:${String(
                    seconds
                  ).padStart(2, "0")}`}
            </div>

            {/* Focus/break Label*/}
            <div
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "var(--text-secondary)",
                marginTop: "8px",
              }}
            >
              {isOnBreak ? "Break Time" : "Focus Time"}
            </div>
          </div>
        </div>
      </div>
      {/* Elapsed Time Label */}
      <div className="mt-8 text-center">
        <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          Total Elapsed: {Math.floor(elapsedTime / 60)} minutes
        </div>
      </div>
    </div>
  );
}
