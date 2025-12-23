import { Calendar, ChevronRight } from "lucide-react";
import type { SessionAndTag } from "../../types/session";
import { formatDate, formatTime } from "../../lib/utils";

interface ScheduledSessionsListProps {
  sessions: SessionAndTag[];
  selectedSessionId?: string;
  onSelectSession: (session: SessionAndTag) => void;
}

export function ScheduledSessionsList({
  sessions,
  selectedSessionId,
  onSelectSession,
}: ScheduledSessionsListProps) {
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
  );

  return (
    <div
      className="p-6 rounded-3xl shadow-lg"
      style={{
        backgroundColor: "var(--off-white)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Calendar
          className="w-5 h-5"
          style={{ color: "var(--text-secondary)" }}
        />
        <h3 style={{ color: "var(--text-primary)" }}>Scheduled Sessions</h3>
      </div>

      <div className="space-y-3">
        {sortedSessions.length > 0 ? (
          sortedSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session)}
              className="w-full p-4 rounded-2xl transition-all hover:scale-[1.02]"
              style={{
                backgroundColor:
                  selectedSessionId === session.id
                    ? "var(--soft-blue-light)"
                    : "var(--warm-neutral)",
                border:
                  selectedSessionId === session.id
                    ? "2px solid var(--soft-blue)"
                    : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: session.tag.color + "30",
                        color: session.tag.color,
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {session.tag.name}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "4px",
                    }}
                  >
                    {session.name}
                  </div>
                  <div
                    style={{ fontSize: "14px", color: "var(--text-secondary)" }}
                  >
                    {formatDate(new Date(session.start_at))} at{" "}
                    {formatTime(new Date(session.start_at))}
                  </div>
                </div>
                <ChevronRight
                  className="w-5 h-5"
                  style={{ color: "var(--text-secondary)" }}
                />
              </div>
            </button>
          ))
        ) : (
          <div
            className="text-center py-8"
            style={{ fontSize: "14px", color: "var(--text-secondary)" }}
          >
            No scheduled sessions
          </div>
        )}
      </div>
    </div>
  );
}
