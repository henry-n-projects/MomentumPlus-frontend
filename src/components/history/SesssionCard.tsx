import { Clock, Tag } from "lucide-react";
import { formatDate, formatTime } from "../../lib/utils";

export interface PomodoroSession {
  id: string;
  startTime: Date;
  endTime: Date;
  totalDuration: number; // in minutes
  breakTime: number; // in minutes
  tag: string;
  distractions: string[];
  breakCount: number;
  breakTimeline: { time: Date; duration: number }[];
}

interface SessionCardProps {
  session: PomodoroSession;
  onClick: () => void;
}

export function SessionCard({ session, onClick }: SessionCardProps) {
  const focusTime = session.totalDuration - session.breakTime;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer transition-all hover:scale-[1.02] bg-white rounded-2xl p-4 shadow-lg"
    >
      {/* Header with Tag */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4" style={{ color: "var(--accent-purple)" }} />
          <span className="px-3 py-1 rounded-full bg-[var(--soft-blue-light)] text-[var(--text-primary)] ">
            {session.tag}
          </span>
        </div>
        <span className="text-[var(--text-secondary)] text-sm">
          {formatDate(session.startTime)}
        </span>
      </div>

      {/* Time Range */}
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-[var(--text-secondary)]" />
        <span className="text-[var(--text-secondary)] text-sm">
          {formatTime(session.startTime) + " - "}
          {formatTime(session.endTime)}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[var(--warm-neutral-dark)]">
        <div>
          <p className="text-[var(--text-secondary)] ">Focus Time</p>
          <p className="text-[var(--text-primary)] font-semibold">
            {focusTime} min
          </p>
        </div>
        <div>
          <p className="text-[var(--text-secondary)] ">Breaks</p>
          <p className="text-[var(--text-primary)] font-semibold">
            {session.breakCount}
          </p>
        </div>
        <div>
          <p className="text-[var(--text-secondary)] ">Break Time</p>
          <p className="text-[var(--text-primary)] font-semibold">
            {session.breakTime} min
          </p>
        </div>
      </div>

      {/* Distractions Count */}
      {session.distractions.length > 0 && (
        <div className="mt-4 px-3 py-2 rounded-lg bg-[var(--warm-neutral)]">
          <span className="text-[var(--text-secondary)] ">
            {session.distractions.length} distraction
            {session.distractions.length !== 1 ? "s" : ""} logged
          </span>
        </div>
      )}
    </div>
  );
}
