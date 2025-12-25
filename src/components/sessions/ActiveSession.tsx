import { Clock } from "lucide-react";
import { formatTime } from "../../lib/utils";
import type { SessionAndTag } from "../../types/session";

interface ActiveSessionProps {
  session: SessionAndTag | undefined;
  isOnBreak: boolean;
  startedAt: Date | null;
}

export function ActiveSession({
  session,
  isOnBreak,
  startedAt,
}: ActiveSessionProps) {
  return (
    <div
      className="p-6 rounded-3xl shadow-lg"
      style={{
        backgroundColor: "var(--off-white)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
        <h3 style={{ color: "var(--text-primary)" }}>In Progress</h3>
      </div>

      <div className="space-y-3">
        {session ? (
          <div
            className="p-4 rounded-2xl"
            style={{
              backgroundColor: "var(--warm-neutral)",
              border: "2px solid var(--warm-neutral-dark)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
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

                  <span
                    className="px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--accent-purple)" + "30",
                      color: "var(--accent-purple)",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {isOnBreak ? "Locked in" : "On break"}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {session.name}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                {startedAt ? `Started at: ${formatTime(startedAt)}` : ""}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="text-center py-8"
            style={{ fontSize: "14px", color: "var(--text-secondary)" }}
          >
            No session in progress
          </div>
        )}
      </div>
    </div>
  );
}
