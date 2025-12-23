import { Clock, Pause, Play, TimerOff } from "lucide-react";

interface SessionControlProps {
  isRunning: boolean;
  isOnBreak: boolean;
  onStart: () => void;
  onStartBreak: () => void;
  onReturnFromBreak: () => void;
  onStop: () => void;
  onEndSession: () => void;
}

export default function SessionControls({
  isRunning,
  isOnBreak,
  onStart,
  onStartBreak,
  onReturnFromBreak,
  onStop,
  onEndSession,
}: SessionControlProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {/* Play/Pause Button */}
      <button
        onClick={onStart}
        className="gap-2"
        style={{
          backgroundColor: isRunning
            ? "var(--warm-neutral-dark)"
            : "var(--soft-blue)",
          color: "var(--text-primary)",
          borderRadius: "24px",
          padding: "12px 24px",
        }}
      >
        {isRunning ? (
          <TimerOff className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
        {isRunning ? "Timing" : "Start"}
      </button>
    </div>
  );
}
