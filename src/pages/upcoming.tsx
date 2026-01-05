import toast from "react-hot-toast";
import { SessionForm } from "../components/upcoming/CreateSessionForm";
import { TagManager } from "../components/upcoming/TagManager";
import {
  useAddSession,
  useAddTag,
  useDeleteSession,
  useGetTags,
  useUpcomingSessions,
} from "../hooks/useUpcoming";
import type { AddSessionBody, AddTagBody } from "../types/upcoming";
import { SessionList } from "../components/upcoming/SessionList";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import { SessionUpdateForm } from "../components/upcoming/UpdateSessionForm";

export default function Upcoming() {
  const [filterTagId, setFilterTagId] = useState<string>("");
  // Fetch users tags
  const { data: tagsData } = useGetTags();
  const tags = tagsData?.data.tags ?? [];
  const { data: scheduledSessionsData } = useUpcomingSessions();
  const scheduledSessions = scheduledSessionsData?.data ?? [];

  const { mutate: addTag } = useAddTag();
  const handleAddTag = (tag: AddTagBody) => {
    addTag(tag, {
      onSuccess: () => {
        toast.success("Tag created");
      },
      onError: () => {
        toast.error("Failed to create tag");
      },
    });
  };
  const { mutate: addSession } = useAddSession();
  const handleAddSession = (newSession: AddSessionBody) => {
    addSession(newSession, {
      onSuccess: () => {
        toast.success("Session created");
      },
      onError: () => {
        toast.error("Failed to create session");
      },
    });
  };

  const handleToggleComplete = () => {};

  const { mutate: deleteSession } = useDeleteSession();
  const handleDeleteSession = (sessionId: string) => {
    deleteSession(sessionId, {
      onSuccess: () => {
        toast.success("Session deleted");
      },
      onError: () => {
        toast.error("Failed to delete session");
      },
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-2">
            Pomodoro Sessions
          </h2>
          <p className="text-xl mt-2 text-[var(--text-secondary)]">
            Schedule and manage your focus sessions
          </p>
        </header>

        {/* Tags Section */}
        <section>
          <TagManager onAddTag={handleAddTag} />
        </section>

        {/* Create Session Section */}
        <section className="pt-5">
          <SessionForm tags={tags} onCreateSession={handleAddSession} />
        </section>

        {/* Filter Section */}
        {scheduledSessions.length > 0 && (
          <section className="pt-5">
            <div className="flex items-center gap-3 mb-4">
              <ListFilter className="w-5 h-5" style={{ color: "#718096" }} />
              <h2
                style={{ fontSize: "24px", fontWeight: 600, color: "#2D3748" }}
              >
                Filter by Tag
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterTagId("")}
                className={`rounded-full border px-4 py-2 ${
                  filterTagId === ""
                    ? "bg-[var(--soft-blue)] text-[var(--text-primary)]"
                    : "border-[var(--soft-blue)] bg-[var(--off-white)] text-[var(--text-primary)]"
                }`}
              >
                All Sessions
              </button>

              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setFilterTagId(tag.id)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    filterTagId === tag.id
                      ? "ring-2 ring-offset-2 ring-offset-[var(--warm-neutral)]"
                      : ""
                  }`}
                  style={{
                    backgroundColor: tag.color,
                    color: "var(--text-primary)",
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </section>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Sessions */}
          <section className="pt-5">
            <SessionList
              sessions={scheduledSessions}
              tags={tags}
              title="Upcoming Sessions"
              emptyMessage="No upcoming sessions scheduled"
              onEdit={handleToggleComplete}
              onDelete={handleDeleteSession}
            />
          </section>

          <section className="pt-5">
            <SessionUpdateForm
              sessions={scheduledSessions}
              tags={tags}
              onUpdateSession={handleToggleComplete}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
