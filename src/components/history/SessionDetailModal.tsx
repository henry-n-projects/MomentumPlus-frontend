import { X, Clock, Coffee, AlertCircle } from "lucide-react";
import { formatDate, formatTime } from "../../lib/utils";
import type { SessionHistory } from "../../types/history";

interface SessionDetailModalProps {
  session: SessionHistory;
  onClose: () => void;
}

export function SessionDetailModal({
  session,
  onClose,
}: SessionDetailModalProps) {
  const focusPercentage = (
    (session.focus_minutes / (session.focus_minutes + session.break_time)) *
    100
  ).toFixed(0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/60"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-semibold text-lg text-[var(--text-primary)] mb-2">
              {session.name}
            </h2>
            <p className="text-[var(--text-secondary)]">
              {formatDate(new Date(session.start_at)) + `: `}
              {formatTime(new Date(session.start_at)) + ` - `}
              {formatTime(new Date(session.end_at))}
            </p>
          </div>
          <button onClick={onClose} style={{ color: "var(--text-secondary)" }}>
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Tag */}
        <div className="mb-6">
          <span
            className="px-4 py-2 rounded-full text-[var(--text-primary)] text-base"
            style={{
              backgroundColor: session.tag?.color,
            }}
          >
            {session.tag?.name}
          </span>
        </div>
        {/* Focus vs Break Chart */}
        <div className="p-6 rounded-2xl mb-6 bg-[var(--warm-neutral)]">
          <h3 className="mb-4 text-[var(--text-primary)]">Time Breakdown</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-[var(--soft-blue)]" />
                <span className="text-[var(--text-secondary)] ">
                  Focus Time
                </span>
              </div>
              <p className="text-[var(--text-primary)] text-3xl font-semibold">
                {Math.round(session.focus_minutes * 10) / 10} min
              </p>
              <p className="text-[var(--text-secondary)] ">
                {focusPercentage}% of session
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="w-5 h-5 text-[var(--accent-purple)]" />
                <span className="text-[var(--text-secondary)]">Break Time</span>
              </div>
              <p className="text-[var(--text-primary)] text-3xl font-semibold">
                {Math.round(session.break_time)} min
              </p>
              <p className=" text-[var(--text-secondary)]">
                {session.break_count} break
                {session.break_count !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Visual Bar */}
          <div className="mt-6 h-4 rounded-full overflow-hidden flex bg-[var(--warm-neutral-dark)]">
            <div
              className="bg-[var(--soft-blue)]"
              style={{
                width: `${focusPercentage}%`,
              }}
            />
            <div
              className="bg-[var(--accent-purple)]"
              style={{
                width: `${100 - parseInt(focusPercentage)}%`,
              }}
            />
          </div>
        </div>
        Break Timeline
        <div className="p-6 rounded-2xl mb-6 bg-[var(--warm-neutral)]">
          <h3 className="mb-4" style={{ color: "var(--text-primary)" }}>
            Break Timeline
          </h3>
          <div className="space-y-3">
            {session.breaks.map((brk, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg bg-white"
              >
                <Coffee className="w-4 h-4 text-[var(--accent-purple)]" />
                <div className="flex-1">
                  <p className="text-[var(--text-primary)]">
                    Break {index + 1}
                  </p>
                  <p className="text-[var(--text-secondary)] ">
                    {formatTime(new Date(brk.start_time)) + " - "}
                    {formatTime(new Date(brk.end_time))}
                  </p>
                </div>
                <span className="text-[var(--text-primary)] font-semibold mr-2">
                  {Math.round(
                    (new Date(brk.end_time).getTime() -
                      new Date(brk.start_time).getTime()) /
                      1000 /
                      60
                  )}{" "}
                  min
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Distractions */}
        <div className="p-6 rounded-2xl bg-[var(--warm-neutral)]">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-[var(--text-secondary)]" />
            <h3 className="text-[var(--text-primary)]">Distractions</h3>
          </div>
          <div className="space-y-2">
            {session.distractions.map((distraction, index) => (
              <div key={index} className="p-3 rounded-lg bg-white">
                <p className="text-[var(--text-primary)]">{distraction.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
