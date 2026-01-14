import { useState, useMemo } from "react";
import {
  SessionCard,
  type PomodoroSession,
} from "../components/history/SesssionCard";
import { SessionDetailModal } from "../components/history/SessionDetailModal";
import { HistoryFilters } from "../components/history/HistoryFilters";

// Mock data for demonstration
const mockSessions: PomodoroSession[] = [
  {
    id: "1",
    startTime: new Date("2026-01-13T09:00:00"),
    endTime: new Date("2026-01-13T10:30:00"),
    totalDuration: 90,
    breakTime: 15,
    tag: "Deep Work",
    distractions: ["Phone notification", "Email check"],
    breakCount: 3,
    breakTimeline: [
      { time: new Date("2026-01-13T09:25:00"), duration: 5 },
      { time: new Date("2026-01-13T09:55:00"), duration: 5 },
      { time: new Date("2026-01-13T10:20:00"), duration: 5 },
    ],
  },
  {
    id: "2",
    startTime: new Date("2026-01-12T14:00:00"),
    endTime: new Date("2026-01-12T15:45:00"),
    totalDuration: 105,
    breakTime: 20,
    tag: "Code Review",
    distractions: ["Slack message"],
    breakCount: 4,
    breakTimeline: [
      { time: new Date("2026-01-12T14:25:00"), duration: 5 },
      { time: new Date("2026-01-12T14:55:00"), duration: 5 },
      { time: new Date("2026-01-12T15:20:00"), duration: 5 },
      { time: new Date("2026-01-12T15:35:00"), duration: 5 },
    ],
  },
  {
    id: "3",
    startTime: new Date("2026-01-11T10:30:00"),
    endTime: new Date("2026-01-11T12:00:00"),
    totalDuration: 90,
    breakTime: 10,
    tag: "Writing",
    distractions: [],
    breakCount: 2,
    breakTimeline: [
      { time: new Date("2026-01-11T11:00:00"), duration: 5 },
      { time: new Date("2026-01-11T11:30:00"), duration: 5 },
    ],
  },
  {
    id: "4",
    startTime: new Date("2026-01-10T15:00:00"),
    endTime: new Date("2026-01-10T16:15:00"),
    totalDuration: 75,
    breakTime: 15,
    tag: "Deep Work",
    distractions: ["Twitter check", "Colleague question"],
    breakCount: 3,
    breakTimeline: [
      { time: new Date("2026-01-10T15:25:00"), duration: 5 },
      { time: new Date("2026-01-10T15:50:00"), duration: 5 },
      { time: new Date("2026-01-10T16:10:00"), duration: 5 },
    ],
  },
  {
    id: "5",
    startTime: new Date("2026-01-09T08:00:00"),
    endTime: new Date("2026-01-09T09:30:00"),
    totalDuration: 90,
    breakTime: 10,
    tag: "Reading",
    distractions: [],
    breakCount: 2,
    breakTimeline: [
      { time: new Date("2026-01-09T08:30:00"), duration: 5 },
      { time: new Date("2026-01-09T09:00:00"), duration: 5 },
    ],
  },
  {
    id: "6",
    startTime: new Date("2026-01-08T13:00:00"),
    endTime: new Date("2026-01-08T14:30:00"),
    totalDuration: 90,
    breakTime: 15,
    tag: "Code Review",
    distractions: ["Phone call"],
    breakCount: 3,
    breakTimeline: [
      { time: new Date("2026-01-08T13:25:00"), duration: 5 },
      { time: new Date("2026-01-08T13:55:00"), duration: 5 },
      { time: new Date("2026-01-08T14:20:00"), duration: 5 },
    ],
  },
  {
    id: "7",
    startTime: new Date("2025-12-20T10:00:00"),
    endTime: new Date("2025-12-20T11:45:00"),
    totalDuration: 105,
    breakTime: 20,
    tag: "Writing",
    distractions: ["Email notification", "Calendar reminder"],
    breakCount: 4,
    breakTimeline: [
      { time: new Date("2025-12-20T10:25:00"), duration: 5 },
      { time: new Date("2025-12-20T10:55:00"), duration: 5 },
      { time: new Date("2025-12-20T11:20:00"), duration: 5 },
      { time: new Date("2025-12-20T11:35:00"), duration: 5 },
    ],
  },
  {
    id: "8",
    startTime: new Date("2025-11-15T14:00:00"),
    endTime: new Date("2025-11-15T15:30:00"),
    totalDuration: 90,
    breakTime: 10,
    tag: "Reading",
    distractions: [],
    breakCount: 2,
    breakTimeline: [
      { time: new Date("2025-11-15T14:30:00"), duration: 5 },
      { time: new Date("2025-11-15T15:00:00"), duration: 5 },
    ],
  },
];

function App() {
  const [selectedSession, setSelectedSession] =
    useState<PomodoroSession | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState(7);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get unique tags
  const tags = useMemo(() => {
    const uniqueTags = new Set(mockSessions.map((s) => s.tag));
    return Array.from(uniqueTags);
  }, []);

  // Filter sessions
  const filteredSessions = useMemo(() => {
    const now = new Date();
    const cutoffDate = new Date(
      now.getTime() - selectedDateRange * 24 * 60 * 60 * 1000
    );

    return mockSessions
      .filter((session) => {
        const dateMatch = session.startTime >= cutoffDate;
        const tagMatch = !selectedTag || session.tag === selectedTag;
        return dateMatch && tagMatch;
      })
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  }, [selectedDateRange, selectedTag]);

  return (
    <div className="min-h-screen bg-[var(--warm-neutral)] px-10 py-7">
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl text-[var(--text-primary)] font-semibold mb-2">
            Sessions History
          </h1>
          <p className="text-xl text-[var(--text-secondary)]">
            Track your completed sessions and productivity patterns
          </p>
        </div>

        {/* Filters */}
        <HistoryFilters
          tags={tags}
          selectedDateRange={selectedDateRange}
          selectedTag={selectedTag}
          onDateRangeChange={setSelectedDateRange}
          onTagChange={setSelectedTag}
        />

        {/* Sessions List */}
        {filteredSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onClick={() => setSelectedSession(session)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-3xl bg-white shadow-xl">
            <p className="text-[var(--text-secondary)]">
              No sessions found for the selected filters.
            </p>
          </div>
        )}

        {/* Detail Modal */}
        {selectedSession && (
          <SessionDetailModal
            session={selectedSession}
            onClose={() => setSelectedSession(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
