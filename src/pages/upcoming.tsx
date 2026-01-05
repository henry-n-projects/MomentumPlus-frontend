import toast from "react-hot-toast";
import { SessionForm } from "../components/upcoming/CreateSessionForm";
import { TagManager } from "../components/upcoming/TagManager";
import {
  useAddSession,
  useAddTag,
  useDeleteSession,
  useGetTags,
  useUpcomingSessions,
  useUpdateSession,
} from "../hooks/useUpcoming";
import type {
  AddSessionBody,
  AddTagBody,
  UpdateSessionBody,
} from "../types/upcoming";
import { SessionList } from "../components/upcoming/SessionList";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import { SessionUpdateForm } from "../components/upcoming/UpdateSessionForm";
import type { SessionAndTag } from "../types/session";

export default function Upcoming() {
  const [filterTagName, setFilterTagName] = useState<string>("");
  const [selectedSessionForEdit, setSelectedSessionForEdit] =
    useState<SessionAndTag | null>(null);
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

  const { mutate: updateSession } = useUpdateSession();
  const handleUpdateSession = (
    id: string,
    updatedSession: UpdateSessionBody
  ) => {
    updateSession(
      { sessionId: id, body: updatedSession },
      {
        onSuccess: () => {
          toast.success("Session updated");
        },
        onError: () => {
          toast.error("Failed to update session");
        },
      }
    );
  };

  const { mutate: deleteSession } = useDeleteSession();
  const handleDeleteSession = (sessionId: string) => {
    deleteSession(sessionId, {
      onSuccess: () => {
        toast.success("Session deleted");
        // Reset form if the deleted session is currently selected
        if (selectedSessionForEdit?.id === sessionId) {
          setSelectedSessionForEdit(null);
        }
      },
      onError: () => {
        toast.error("Failed to delete session");
      },
    });
  };

  const filteredSessions =
    filterTagName === ""
      ? scheduledSessions
      : scheduledSessions.filter(
          (session) => session.tag.name === filterTagName
        );
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
              <ListFilter className="w-5 h-5 text-[var(--text-primary)}" />
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Filter by Tag
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterTagName("")}
                className={`rounded-full border px-4 py-2 ${
                  filterTagName === ""
                    ? "bg-[var(--soft-blue)] text-[var(--text-primary)]"
                    : "border-[var(--soft-blue)] bg-[var(--off-white)] text-[var(--text-primary)]"
                }`}
              >
                All Sessions
              </button>

              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setFilterTagName(tag.name)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    filterTagName === tag.name
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
              sessions={filteredSessions}
              tags={tags}
              title="Upcoming Sessions"
              emptyMessage="No upcoming sessions scheduled"
              onEdit={setSelectedSessionForEdit}
              onDelete={handleDeleteSession}
            />
          </section>

          <section className="pt-5">
            <SessionUpdateForm
              sessionToEdit={selectedSessionForEdit}
              tags={tags}
              onUpdateSession={handleUpdateSession}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
