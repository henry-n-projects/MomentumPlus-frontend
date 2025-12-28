import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SessionTimer } from "../components/sessions/SessionTimer";
import type { SessionAndTag } from "../types/session";
import {
  useActiveSession,
  useAddSessionDistraction,
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
import { ActiveSession } from "../components/sessions/ActiveSession";
import toast from "react-hot-toast";

export default function Session() {
  // Session state
  const [isRunning, setIsRunning] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [breakDuration, setBreakDuration] = useState(0);
  const [breakCount, setBreakCount] = useState(0);
  const [distractions, setDistractions] = useState<
    { name: string; time: Date }[]
  >([]);
  const [activeBreakId, setActiveBreakId] = useState<string | null>(null);

  // Fetch Scheduled Sessions
  const { data: scheduledSessionData, refetch: refetchScheduled } =
    useScheduledSessions();

  const scheduledSessions = scheduledSessionData?.data ?? [];

  // Router hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("id");

  // Fetch selected session id
  const { data: sessionData, isLoading: isSessionLoading } = useSession(
    sessionId || ""
  );
  const selectedSession = sessionData?.data?.session;

  const { data: activeSessionData, isLoading: isActiveLoading } =
    useActiveSession();
  const activeSession = activeSessionData ? activeSessionData?.data : null;

  // Set sessionId in the url params default to first scheduled session if not provided
  useEffect(() => {
    // 1. If URL already has an id, don't touch it
    if (sessionId) return;

    // 2. If backend says there's an active session, use that
    if (isActiveLoading) return;

    if (activeSession) {
      console.log(`active session id: ${activeSession.session.id}`);
      setSearchParams({ id: activeSession.session.id });
      return;
    }

    // 3. Otherwise, fall back to the first scheduled session
    if (scheduledSessions.length > 0) {
      console.log(`Try to set 1st scheduled: ${scheduledSessions[0].id}`);
      setSearchParams({ id: scheduledSessions[0].id });
    }
  }, [sessionId, activeSession, scheduledSessions, setSearchParams]);

  // Hydrate UI state from backend when a session is IN_PROGRESS
  useEffect(() => {
    if (isSessionLoading) return;

    // If we have no data yet, don't touch UI
    if (!sessionData || !selectedSession) {
      resetSessionState();
      return;
    }

    // Only hydrate when this session is IN_PROGRESS
    if (selectedSession.status !== "IN_PROGRESS") {
      resetSessionState();
      return;
    }

    const activity = sessionData.data.activity;
    const breaks = activity.breaks ?? [];
    const now = new Date();
    const start = new Date(selectedSession.start_at);

    // 1. Elapsed time (seconds since start)
    const elapsedSeconds = Math.max(
      Math.floor((now.getTime() - start.getTime()) / 1000),
      0
    );

    // 2. Completed breaks (only those with end_time)
    const completedBreakSeconds = breaks
      .filter((b) => b.end_time)
      .reduce((sum, b) => {
        const startMs = new Date(b.start_time).getTime();
        const endMs = new Date(b.end_time!).getTime();
        const diff = Math.max(Math.round((endMs - startMs) / 1000), 0);
        return sum + diff;
      }, 0);

    // 3. Active break (if any)
    const activeBreak = breaks.find((b) => !b.end_time);
    const activeBreakSeconds = activeBreak
      ? Math.max(
          Math.round(
            (now.getTime() - new Date(activeBreak.start_time).getTime()) / 1000
          ),
          0
        )
      : 0;

    // 4. Hydrate distractions
    const distractionsFromApi = activity.distractions ?? [];

    // 5. Push everything into UI state
    setIsRunning(true);
    setStartedAt(start);
    setElapsedTime(elapsedSeconds);
    setBreakDuration(completedBreakSeconds + activeBreakSeconds);
    setBreakCount(breaks.length);
    setIsOnBreak(Boolean(activeBreak));
    setActiveBreakId(activeBreak ? activeBreak.id : null);
    setDistractions(
      distractionsFromApi.map((d) => ({
        name: d.name,
        time: new Date(d.occurred_at),
      }))
    );
  }, [sessionData, selectedSession]);

  const [startedAt, setStartedAt] = useState<Date | null>(null);
  // Update time spent and elapsed time
  useEffect(() => {
    // Create reference of interval object to clean up interval objects on renders
    let interval: ReturnType<typeof setInterval>;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);

        if (isOnBreak) {
          setBreakDuration((prev) => prev + 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isOnBreak]);

  function resetSessionState() {
    setIsRunning(false);
    setIsOnBreak(false);
    setElapsedTime(0);
    setBreakDuration(0);
    setBreakCount(0);
    setDistractions([]);
    setActiveBreakId(null);
    setStartedAt(null);
  }

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
        setStartedAt(new Date());
        toast.success("Started session.");
      },
      onError: () => {
        setIsRunning(false);
        toast.error("Failed to start session.");
      },
    });
  };

  const { mutate: sessionEnd } = useEndSession();
  const handleEndSession = () => {
    if (!selectedSession) return;
    sessionEnd(selectedSession.id, {
      onSuccess: async () => {
        // 1. Reset all local UI state
        resetSessionState();

        // 2. Refetch scheduled sessions from backend
        const result = await refetchScheduled();
        const freshSessions = result.data?.data ?? [];

        // 3. Pick the first scheduled session, if any
        if (freshSessions.length > 0) {
          setSearchParams({ id: freshSessions[0].id });
        } else {
          setSearchParams({});
        }
        toast.success("Session completed!");
      },
      onError: () => {
        toast.error("Failed to end session.");
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
          toast.success("Started break.");
        },
        onError: () => {
          setIsOnBreak(false);
          toast.error("Failed to start break.");
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
          toast.success("Ended break.");
        },
        onError: () => {
          setIsOnBreak(true);
          toast.error("Failed to end break.");
        },
      }
    );
  };
  const { mutate: addDistraction } = useAddSessionDistraction();
  const handleAddDistraction = (distraction: string) => {
    if (!isRunning || !selectedSession) return;
    const trimmed = distraction.trim();
    if (!trimmed) return;

    // optimistic add
    const newDistraction = {
      name: trimmed,
      time: new Date(),
    };

    setDistractions((prev) => [...prev, newDistraction]);
    addDistraction(
      {
        sessionId: selectedSession.id,
        body: { name: trimmed },
      },
      {
        onSuccess: (data) => {
          setDistractions((prev) =>
            prev.map((d) =>
              d === newDistraction
                ? {
                    name: data.data.name,
                    time: new Date(data.data.occurred_at),
                  }
                : d
            )
          );
        },
        onError: () => {
          setDistractions((prev) => prev.slice(0, -1));
          toast.error("Failed to add distraction.");
        },
      }
    );
  };
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
                canStart={Boolean(selectedSession)}
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
              distractions={distractions}
              onAddDistraction={handleAddDistraction}
              canAddDistraction={isRunning && Boolean(selectedSession)}
            />
          </div>
          {/* Right Column - Scheduled and active session */}
          <div className="lg:col-span-1 space-y-8">
            <ActiveSession
              session={selectedSession}
              isOnBreak={isOnBreak}
              startedAt={startedAt}
              isRunning={isRunning}
            />

            <ScheduledSessionsList
              sessions={scheduledSessions}
              selectedSessionId={sessionId || undefined}
              onSelectSession={handleSelectSession}
              canSelect={!isRunning}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
