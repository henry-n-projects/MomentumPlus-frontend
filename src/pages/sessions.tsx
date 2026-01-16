import toast from "react-hot-toast";
import { CreateSessionForm } from "../components/sessions/CreateSessionForm";
import { AddTag } from "../components/sessions/AddTag";
import {
  useAddSession,
  useAddTag,
  useDeleteSession,
  useDeleteTag,
  useGetTags,
  useUpdateSession,
} from "../hooks/useSessions";
import type {
  AddSessionBody,
  AddTagBody,
  UpdateSessionBody,
} from "../types/sessions";
import { SessionList } from "../components/sessions/SessionList";
import { useState } from "react";
import { SessionUpdateForm } from "../components/sessions/UpdateSessionForm";
import type { SessionAndTag } from "../types/record";
import { useScheduledSessions } from "../hooks/useRecord";
import { TagFilters } from "../components/history/TagFilters";
import { RemoveTag } from "../components/sessions/RemoveTag";

export default function Sessions() {
  const [tagId, setTagId] = useState<string | null>(null);
  const [selectedSessionForEdit, setSelectedSessionForEdit] =
    useState<SessionAndTag | null>(null);
  // Fetch users tags
  const { data: tagsData } = useGetTags();
  const tags = tagsData?.data.tags ?? [];
  const { data: scheduledSessionsData } = useScheduledSessions();
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

  const { mutate: deleteTag } = useDeleteTag();
  const handleDeleteTag = (tagId: String) => {
    deleteTag(tagId, {
      onSuccess: () => {
        toast.success("tag deleted");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ?? "Cannot delete tag in use"
        );
      },
    });
  };

  const filteredSessions =
    tagId === null
      ? scheduledSessions
      : scheduledSessions.filter((session) => session.tag.id === tagId);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-2">
            Manage Sessions
          </h2>
          <p className="text-xl mt-2 text-[var(--text-secondary)]">
            Schedule and manage your sessions
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN — Sessions */}
          <div>
            <TagFilters
              tags={tags}
              selectedTag={tagId}
              onTagChange={setTagId}
            />

            {/* Upcoming Sessions */}
            <SessionList
              sessions={filteredSessions}
              tags={tags}
              title="Upcoming Sessions"
              emptyMessage="No upcoming sessions scheduled"
              onEdit={setSelectedSessionForEdit}
              onDelete={handleDeleteSession}
            />
          </div>

          {/* RIGHT COLUMN — Actions */}
          <div className="space-y-6">
            <div className=" flex justify-start gap-2">
              <AddTag onAddTag={handleAddTag} />

              <RemoveTag onRemoveTag={handleDeleteTag} tags={tags} />
            </div>

            {/* Create Session */}
            <section>
              <CreateSessionForm
                tags={tags}
                onCreateSession={handleAddSession}
              />
            </section>
          </div>
        </div>
      </div>
      {selectedSessionForEdit && (
        <SessionUpdateForm
          sessionToEdit={selectedSessionForEdit}
          tags={tags}
          onUpdateSession={handleUpdateSession}
          onClose={() => setSelectedSessionForEdit(null)}
        />
      )}
    </div>
  );
}
