import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SessionTimer } from "../components/sessions/SessionTimer";
import type { SessionAndTag } from "../types/session";
import {
  useEndSession,
  useEndSessionBreak,
  useScheduledSessions,
  useSession,
  useStartSession,
  useStartSessionBreak,
} from "../hooks/useSessions";
import { ScheduledSessionsList } from "../components/sessions/ScheduledSessionsList";
import SessionControls from "../components/sessions/SessionControls";
import { ChevronRight } from "lucide-react";
import { SessionActivity } from "../components/sessions/SessionActivity";

export default function Session() {
  // Session state
  const [isRunning, setIsRunning] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [breakDuration, setBreakDuration] = useState(0);
  const [breakCount, setBreakCount] = useState(0);
  // Fetch Scheduled Sessions
  const { data: scheduledSessionData } = useScheduledSessions();
  const scheduledSessions = scheduledSessionData?.data ?? [];

  // Router hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("id");

  // Fetch selected session id
  const { data: sessionData } = useSession(sessionId || "");
  const selectedSession = sessionData?.data?.session;

  // Set sessionId in the url params default to first scheduled session if not provided
  useEffect(() => {
    if (!sessionId && scheduledSessions.length > 0) {
      setSearchParams({ id: scheduledSessions[0].id });
    }
  }, [sessionId, scheduledSessions, setSearchParams]);

  const canStart = Boolean(selectedSession);

  // Track active break
  const [activeBreakId, setActiveBreakId] = useState<string | null>(null);

  // Update time spent and elapsed time
  useEffect(() => {
    // Create reference of interval object to clean up interval objects on renders
    let interval: ReturnType<typeof setInterval>;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);

        if (!isOnBreak) {
          setElapsedTime((prev) => prev + 1);
        } else {
          setBreakDuration((prev) => prev + 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isOnBreak]);

  // Handles selecting a session from the list Updates the URL with the new session ID
  const handleSelectSession = useCallback(
    (session: SessionAndTag) => {
      setSearchParams({ id: session.id });
    },
    [setSearchParams]
  );

  // Control functions
  const { mutate: sessionStart } = useStartSession();
  const handleStartSession = () => {
    if (!selectedSession) return;
    sessionStart(selectedSession.id, {
      onSuccess: () => {
        setIsRunning(true);
      },
      onError: () => {
        setIsRunning(false);
      },
    });
  };

  const { mutate: sessionEnd } = useEndSession();
  const handleEndSession = () => {
    if (!selectedSession) return;
    sessionEnd(selectedSession.id, {
      onSuccess: () => {
        setIsRunning(false);
        // TODO: reset everything refetch show success
        // selected id, states
      },
      onError: () => {
        setIsRunning(true);
      },
    });
  };

  const { mutate: startBreak } = useStartSessionBreak();
  const handleStartBreak = () => {
    if (!selectedSession) return;
    startBreak(
      { sessionId: selectedSession.id },
      {
        onSuccess: (data) => {
          setIsOnBreak(true);
          setActiveBreakId(data.data.break.id);
          setBreakCount((prev) => prev + 1);
        },
        onError: () => {
          setIsOnBreak(false);
        },
      }
    );
  };
  const { mutate: endBreak } = useEndSessionBreak();
  const handleEndBreak = () => {
    if (!selectedSession || !activeBreakId) return;
    endBreak(
      { sessionId: selectedSession.id, breakId: activeBreakId },
      {
        onSuccess: () => {
          setIsOnBreak(false);
        },
        onError: () => {
          setIsOnBreak(true);
        },
      }
    );
  };
  const handleAddDistraction = () => {};
  const handleUpcomingNavigation = () => {};

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-xl font-semibold">
          <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-2">
            Your Session
          </h2>
          {selectedSession && (
            <div className="flex items-center gap-3">
              <span
                className="px-4 py-2 rounded-full"
                style={{
                  backgroundColor: selectedSession.tag.color + "30",
                  color: selectedSession.tag.color,
                  fontWeight: 600,
                }}
              >
                {selectedSession.tag.name}
              </span>
              <span
                style={{ fontSize: "16px", color: "var(--text-secondary)" }}
              >
                {selectedSession.name}
              </span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Timer and Controls */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timer*/}
            <div
              className="p-12 rounded-3xl shadow-lg flex justify-center"
              style={{
                backgroundColor: "var(--off-white)",
              }}
            >
              {!selectedSession ? (
                <div>
                  <button
                    onClick={handleUpcomingNavigation}
                    className="flex items-center gap-2
                    px-5 py-2
                    rounded-full shadow-lg
                    overflow-hidden
                    transition-opacity
                    transition-transform animate-pulse-gentle"
                    style={{
                      backgroundColor: "var(--soft-blue)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Create and select a session to begin
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <SessionTimer
                  elapsedTime={elapsedTime}
                  isRunning={isRunning}
                  isOnBreak={isOnBreak}
                />
              )}
            </div>

            {/* Controls */}
            <div
              className="p-6 rounded-3xl shadow-lg"
              style={{
                backgroundColor: "var(--off-white)",
              }}
            >
              <SessionControls
                isOnBreak={isOnBreak}
                isRunning={isRunning}
                canStart={canStart}
                onStart={handleStartSession}
                onEndSession={handleEndSession}
                onStartBreak={handleStartBreak}
                onReturnFromBreak={handleEndBreak}
              />
            </div>
            <SessionActivity
              timeSpent={elapsedTime}
              breakCount={breakCount}
              breakDuration={breakDuration}
              distractions={[]}
              onAddDistraction={handleAddDistraction}
              canAddDistraction={canStart}
            />
          </div>
          {/* Right Column - Scheduled Sessions */}
          <div className="lg:col-span-1 space-y-8">
            <ScheduledSessionsList
              sessions={scheduledSessions}
              selectedSessionId={sessionId || undefined}
              onSelectSession={handleSelectSession}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
