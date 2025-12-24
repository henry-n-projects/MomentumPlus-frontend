import { CheckCircle, Coffee, Play, TimerOff } from "lucide-react";
import { motion } from "motion/react";

interface SessionControlProps {
  isRunning: boolean;
  isOnBreak: boolean;
  canStart: Boolean;
  onStart: () => void;
  onStartBreak: () => void;
  onReturnFromBreak: () => void;
  onEndSession: () => void;
}

export default function SessionControls({
  isRunning,
  isOnBreak,
  canStart,
  onStart,
  onStartBreak,
  onReturnFromBreak,
  onEndSession,
}: SessionControlProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {/* Play*/}

      <motion.button
        onClick={onStart}
        className="flex items-center gap-2
            px-5 py-2
            rounded-full shadow-lg
            overflow-hidden
            transition-opacity"
        disabled={isRunning || !canStart}
        whileHover={!isRunning && canStart ? { scale: 1.05 } : {}}
        style={{
          backgroundColor:
            isRunning || !canStart ? "var(--warm-neutral)" : "var(--soft-blue)",
          color:
            isRunning || !canStart
              ? "var(--text-secondary)"
              : "var(--text-primary)",
        }}
      >
        {isRunning ? (
          <TimerOff className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
        {isRunning && !canStart ? "Timing" : "Start"}
      </motion.button>

      {/* Break Controls */}
      {!isOnBreak ? (
        <motion.button
          onClick={onStartBreak}
          whileHover={!isOnBreak && isRunning ? { scale: 1.05 } : {}}
          className="flex items-center gap-2
            px-5 py-2
            rounded-full shadow-lg
            overflow-hidden
            transition-opacity"
          disabled={!isRunning}
          style={{
            backgroundColor:
              !isOnBreak && isRunning
                ? "var(--soft-blue)"
                : "var(--warm-neutral)",
            borderColor: "var(--accent-purple)",
            color:
              !isOnBreak && isRunning
                ? "var(--text-primary)"
                : "var(--text-secondary)",
          }}
        >
          <Coffee className="w-5 h-5" />
          Start Break
        </motion.button>
      ) : (
        <motion.button
          onClick={onReturnFromBreak}
          whileHover={isRunning ? { scale: 1.05 } : {}}
          className="flex items-center gap-2
            px-5 py-2
            rounded-full shadow-lg
            overflow-hidden
            transition-opacity"
          style={{
            backgroundColor: "var(--accent-purple)",
            borderColor: "var(--soft-blue)",
            color: "var(--text-primary)",
          }}
        >
          <Play className="w-5 h-5" />
          Return from Break
        </motion.button>
      )}

      {/* End Session Button */}
      <motion.button
        onClick={onEndSession}
        disabled={!isRunning || isOnBreak}
        whileHover={isRunning && !isOnBreak ? { scale: 1.05 } : {}}
        className="flex items-center gap-2
            px-5 py-2
            rounded-full shadow-lg
            overflow-hidden
            transition-opacity"
        style={{
          backgroundColor:
            isRunning && !isOnBreak
              ? "var(--accent-purple)"
              : "var(--warm-neutral)",
          color:
            isRunning && !isOnBreak
              ? "var(--text-primary)"
              : "var(--text-secondary)",
          borderRadius: "24px",
          padding: "12px 24px",
        }}
      >
        <CheckCircle className="w-5 h-5" />
        End Session
      </motion.button>
    </div>
  );
}
