import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, Edit } from "lucide-react";
import type { TagType } from "../../types/tag";
import type { SessionAndTag } from "../../types/session";
import type { UpdateSessionBody } from "../../types/upcoming";

interface SessionUpdateFormProps {
  sessionToEdit: SessionAndTag | null;
  tags: TagType[];
  onUpdateSession: (
    sessionId: string,
    updatedSession: UpdateSessionBody
  ) => void;
}

export function SessionUpdateForm({
  sessionToEdit,
  tags,
  onUpdateSession,
}: SessionUpdateFormProps) {
  const [sessionName, setSessionName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");
  const today = new Date().toLocaleDateString("en-CA");
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  // Load selected session data into form
  useEffect(() => {
    if (sessionToEdit) {
      const date = new Date(sessionToEdit.start_at);
      const dateStr = date.toLocaleDateString("en-CA");
      const timeStr = date.toTimeString().slice(0, 5);
      setSessionName(sessionToEdit.name ?? "");
      setSelectedDate(dateStr);
      setSelectedTime(timeStr);
      setSelectedTagId(sessionToEdit.tag.id);
    } else {
      setSessionName("");
      setSelectedDate("");
      setSelectedTime("");
      setSelectedTagId("");
    }
  }, [sessionToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !sessionToEdit ||
      !sessionName.trim() ||
      !selectedDate ||
      !selectedTime ||
      !selectedTagId
    ) {
      return;
    }

    const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);

    const updatedSession: UpdateSessionBody = {
      name: sessionName.trim(),
      start_at: scheduledDateTime.toISOString(),
      tag_id: selectedTagId,
    };
    console.log(updatedSession);

    onUpdateSession(sessionToEdit.id, updatedSession);
  };

  if (!sessionToEdit) {
    return (
      <div className="p-6 rounded-3xl bg-white shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Edit className="w-5 h-5 text-[var(--text-primary)]" />
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">
            Update Session
          </h3>
        </div>
        <p className="text-center text-[var(--text-secondary)]">
          Select a session to edit
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-white shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Edit className="w-5 h-5 text-[var(--text-primary)]" />
        <h3 className="text-xl font-semibold text-[var(--text-primary)]">
          Edit Session
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-x-4">
          <label className="text-sm text-[var(--text-secondary)]">
            Session Name
          </label>
          <input
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            placeholder="Focus work session"
            className="px-4 mt-2 rounded-full bg-[var(--warm-neutral)] shadow"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-x-2">
            <label className="text-sm text-[var(--text-secondary)]">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              min={today}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-2 px-4 rounded-full bg-[var(--warm-neutral)] shadow"
              required
            />
          </div>

          <div className="space-x-2">
            <label className="text-sm text-[var(--text-secondary)]">
              <Clock className="w-4 h-4 inline mr-1" />
              Time
            </label>
            <input
              type="time"
              value={selectedTime}
              min={selectedDate === today ? currentTime : undefined}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="mt-2 px-4 rounded-full bg-[var(--warm-neutral)] shadow"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-[var(--text-secondary)]">Tag</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => setSelectedTagId(tag.id)}
                className={`px-3 py-1.5 rounded-full transition-all text-[var(--text-primary)] font-medium text-sm ${
                  selectedTagId === tag.id
                    ? "ring-2 ring-offset-2 ring-offset-white"
                    : ""
                }`}
                style={{
                  backgroundColor: tag.color,
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full rounded-full py-2 shadow-lg"
          disabled={
            !sessionName.trim() ||
            !selectedDate ||
            !selectedTime ||
            !selectedTagId
          }
          whileHover={
            !sessionName.trim() ||
            !selectedDate ||
            !selectedTime ||
            !selectedTagId
              ? {}
              : { scale: 1.02 }
          }
          style={
            !sessionName.trim() ||
            !selectedDate ||
            !selectedTime ||
            !selectedTagId
              ? {
                  backgroundColor: "var(--warm-neutral)",
                  color: "var(--text-secondary)",
                }
              : {
                  backgroundColor: "var(--accent-purple)",
                  color: "var(--text-primary)",
                }
          }
        >
          Update
        </motion.button>
      </form>
    </div>
  );
}
