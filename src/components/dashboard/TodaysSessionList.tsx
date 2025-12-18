import { Clock, CheckCircle2, Circle, Play } from "lucide-react";
import type { DashboardResponse } from "../../types/dashboard";

const handleStartSession = (sessionTitle: string) => {
  console.log(`Starting session: ${sessionTitle}`);
  // Add your session start logic here
};
type sessionProps = {
  dashboard: DashboardResponse;
};

export function TodaySessionList({ dashboard }: sessionProps) {
  const sessions = dashboard.data.today.sessions;

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:shadow-md"
          style={{
            backgroundColor:
              session.status === "COMPLETED"
                ? "rgba(163, 201, 224, 0.1)"
                : "var(--warm-neutral)",
            border:
              session.status === "COMPLETED"
                ? "none"
                : "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex-shrink-0">
            {session.status === "COMPLETED" ? (
              <CheckCircle2
                className="w-6 h-6"
                style={{ color: "var(--soft-blue)" }}
              />
            ) : (
              <Circle className="w-6 h-6" style={{ color: "#718096" }} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4
                style={{
                  color: "var(--text-primary)",
                  fontSize: "16px",
                  fontWeight: 600,
                  textDecoration:
                    session.status === "COMPLETED" ? "line-through" : "none",
                  opacity: session.status === "COMPLETED" ? 0.6 : 1,
                }}
              >
                {session.name}
              </h4>
              <span
                className="px-2 py-1 rounded-full"
                style={{
                  backgroundColor: session.tag.color,
                  fontSize: "12px",
                  color: "#2D3748",
                  fontWeight: 600,
                }}
              >
                {session.tag.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="flex items-center gap-1"
                style={{ fontSize: "14px", color: "#718096" }}
              >
                <Clock className="w-4 h-4" />
                {new Date(session.start_at).toLocaleDateString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          {session.status !== "COMPLETED" && (
            <button
              onClick={() => handleStartSession(session.name)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:shadow-md active:scale-95"
              style={{
                backgroundColor: "#A3C9E0",
                color: "#2D3748",
              }}
            >
              <Play className="w-4 h-4" />
              Start
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
