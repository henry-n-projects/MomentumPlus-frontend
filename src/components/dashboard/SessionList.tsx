import { Clock, CheckCircle2, Circle, Play } from "lucide-react";
import type { Session } from "../../types/dashboard";

const handleStartSession = (sessionTitle: string) => {
  console.log(`Starting session: ${sessionTitle}`);
  //session start logic here
};
type sessionProps = {
  todaySessions: Session[];
};

export function TodaySessionList({ todaySessions }: sessionProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 text-textPrimary">
        Today's Sessions
      </h3>
      <div className="space-y-4">
        {todaySessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:shadow-md"
            style={{
              backgroundColor:
                session.status === "COMPLETED"
                  ? "var(--soft-blue-extra-light)"
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
                <Circle
                  className="w-6 h-6"
                  style={{ color: "var(--text-secondary)" }}
                />
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
                    color: "var(--text-primary)",
                    fontWeight: 600,
                  }}
                >
                  {session.tag.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="flex items-center gap-1"
                  style={{ fontSize: "14px", color: "var(--text-secondary)" }}
                >
                  <Clock className="w-4 h-4" />
                  {new Date(session.start_at).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>

            {session.status !== "COMPLETED" && (
              <button
                onClick={() => handleStartSession(session.name)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:shadow-md active:scale-95"
                style={{
                  backgroundColor: "var(--soft-blue)",
                  color: "var(--text-primary)",
                }}
              >
                <Play className="w-4 h-4" />
                Start
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
