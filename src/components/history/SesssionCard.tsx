import { Clock, Tag } from "lucide-react";
import { formatDate, formatTime } from "../../lib/utils";
import type { TagType } from "../../types/tag";
import type { SessionHistory } from "../../types/history";

interface SessionCardProps {
  session: SessionHistory;
  onClick: () => void;
}

export function SessionCard({ session, onClick }: SessionCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer transition-all hover:scale-[1.02] bg-white rounded-2xl p-4 shadow-lg"
    >
      {/* Header with Tag */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4" style={{ color: "var(--accent-purple)" }} />
          {session.tag ? (
            <span
              className="px-3 py-1 rounded-full text-[var(--text-primary)]"
              style={{ backgroundColor: session.tag.color }}
            >
              {session.tag.name}
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-600">
              Untagged
            </span>
          )}
        </div>
        <span className="text-[var(--text-secondary)] text-sm">
          {formatDate(new Date(session.start_at))}
        </span>
      </div>

      {/* Time Range */}
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-[var(--text-secondary)]" />
        <span className="text-[var(--text-secondary)] text-sm">
          {formatTime(new Date(session.start_at)) + " - "}
          {formatTime(new Date(session.end_at))}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[var(--warm-neutral-dark)]">
        <div>
          <p className="text-[var(--text-secondary)] ">Focus Time</p>
          <p className="text-[var(--text-primary)] font-semibold">
            {Math.round(session.focus_minutes * 10) / 10} min
          </p>
        </div>
        <div>
          <p className="text-[var(--text-secondary)] ">Breaks</p>
          <p className="text-[var(--text-primary)] font-semibold">
            {session.break_count}
          </p>
        </div>
        <div>
          <p className="text-[var(--text-secondary)] ">Break Time</p>
          <p className="text-[var(--text-primary)] font-semibold">
            {session.break_time} min
          </p>
        </div>
      </div>

      {/* Distractions Count */}
      <div className="mt-4 px-3 py-2 rounded-lg bg-[var(--warm-neutral)]">
        <span className="text-[var(--text-secondary)] ">
          {session.distraction_count} logged
        </span>
      </div>
    </div>
  );
}
