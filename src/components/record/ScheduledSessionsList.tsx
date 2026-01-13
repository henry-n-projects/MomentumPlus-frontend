import { Calendar, ChevronRight } from "lucide-react";
import type { SessionAndTag } from "../../types/record";
import { formatDate } from "../../lib/utils";

interface ScheduledSessionsListProps {
  sessions: SessionAndTag[];
  selectedSessionId?: string;
  canSelect: boolean;
  onSelectSession: (session: SessionAndTag) => void;
}

export function ScheduledSessionsList({
  sessions,
  selectedSessionId,
  canSelect,
  onSelectSession,
}: ScheduledSessionsListProps) {
  const visibleSessions = sessions
    .filter((s) => s.id !== selectedSessionId)
    .sort(
      (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
    );

  return (
    <div
      className="p-6 rounded-3xl shadow-lg"
      style={{ backgroundColor: "white" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Calendar
          className="w-5 h-5"
          style={{ color: "var(--text-secondary)" }}
        />
        <h3 style={{ color: "var(--text-primary)" }}>Scheduled Sessions</h3>
      </div>

      <div className="space-y-3">
        {visibleSessions.length > 0 ? (
          visibleSessions.map((session) => (
            <button
              key={session.id}
              disabled={!canSelect}
              onClick={() => canSelect && onSelectSession(session)}
              className={`w-full p-4 rounded-2xl 
                ${
                  canSelect
                    ? " transition-all hover:border-2 hover:border-[var(--warm-neutral-dark)]"
                    : "opacity-50"
                }
              `}
              style={{
                backgroundColor: "var(--warm-neutral)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: session.tag.color,
                        color: "var(--text-primary)",
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
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {formatDate(new Date(session.start_at))} at{" "}
                    {new Date(session.start_at).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
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
