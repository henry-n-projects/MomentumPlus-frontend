import { useState } from "react";
import { SessionCard } from "../components/history/SesssionCard";
import { SessionDetailModal } from "../components/history/SessionDetailModal";
import { HistoryFilters } from "../components/history/HistoryFilters";
import { useHistoryList } from "../hooks/useHistory";
import type { SessionHistory } from "../types/history";

function App() {
  const [selectedSession, setSelectedSession] = useState<SessionHistory | null>(
    null
  );
  const [selectedDateRange, setSelectedDateRange] = useState(7);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const historyListData = useHistoryList(selectedDateRange, selectedTag);

  const tagsData = historyListData.data ? historyListData.data.data.tags : [];
  const sessionsList = historyListData.data?.data.sessions ?? [];

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
          tags={tagsData}
          selectedDateRange={selectedDateRange}
          selectedTag={selectedTag}
          onDateRangeChange={setSelectedDateRange}
          onTagChange={setSelectedTag}
        />

        {/* Sessions List */}
        {sessionsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessionsList.map((session) => (
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
