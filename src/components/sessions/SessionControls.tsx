import { Pause, Play } from "lucide-react";

interface SessionControlProps {
  isRunning: boolean;
  isOnBreak: boolean;
  onStartPause: () => void;
  onStartBreak: () => void;
  onReturnFromBreak: () => void;
  onStop: () => void;
  onEndSession: () => void;
}

export default function SessionControls({
  isRunning,
  isOnBreak,
  onStartPause,
  onStartBreak,
  onReturnFromBreak,
  onStop,
  onEndSession,
}: SessionControlProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={onStartPause}
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
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
}
