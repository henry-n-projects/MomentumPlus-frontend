import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import type { TagType } from "../../types/tag";
import { motion } from "motion/react";
import type { AddSessionBody } from "../../types/upcoming";
export interface Session {
  id: string;
  name: string;
  scheduledDate: Date;
  tagId: string;
  completed: boolean;
}

interface SessionFormProps {
  tags: TagType[];
  onCreateSession: (session: AddSessionBody) => void;
}

export function SessionForm({ tags, onCreateSession }: SessionFormProps) {
  const [sessionName, setSessionName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");

  const canSubmit = Boolean(
    sessionName.trim() &&
      selectedDate &&
      selectedTime &&
      selectedTagId &&
      tags.length > 0
  );

  const today = new Date().toLocaleDateString("en-CA");
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const selectedTag = tags.find((tag) => tag.id === selectedTagId);
    const newSession: AddSessionBody = {
      name: sessionName.trim(),
      start_at: scheduledDateTime.toISOString(),
      end_at: null,
      tag_id: selectedTagId,
      new_tag_name: selectedTag?.name ?? "",
      new_tag_color: selectedTag?.color ?? null,
    };

    onCreateSession(newSession);

    // Reset form
    setSessionName("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedTagId("");
  };

  return (
    <div className="p-6 rounded-3xl bg-white shadow-lg">
      <h3 className="text-xl font-semibold text[var(--text-primary)] mb-6">
        Create Session
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            Session Name
          </label>
          <input
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            placeholder="Focus work session"
            className="rounded-full bg-[var(--warm-neutral)] px-4 py-0.5 shadow"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              min={today}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-full bg-[var(--warm-neutral)] px-4 py-0.5 shadow"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
              <Clock className="w-4 h-4 inline mr-1" />
              Time
            </label>
            <input
              type="time"
              value={selectedTime}
              min={selectedDate === today ? currentTime : undefined}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="rounded-full bg-[var(--warm-neutral)] px-4 py-0.5 shadow"
              required
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            Tag
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => setSelectedTagId(tag.id)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  selectedTagId === tag.id
                    ? "ring-2 ring-offset-2 ring-offset-white"
                    : ""
                }`}
                style={{
                  backgroundColor: tag.color,
                  color: "var(--text-primaryl)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
          {tags.length === 0 && (
            <p
              style={{
                fontSize: "14px",
                color: "var(--accent-red)",
                marginTop: "8px",
              }}
            >
              Please create at least one tag first
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          className="rounded-full shadow-lg px-4 py-2 "
          whileHover={canSubmit ? { scale: 1.03 } : {}}
          style={
            canSubmit
              ? {
                  color: "var(--text-primary)",
                  backgroundColor: "var(--soft-blue)",
                }
              : {
                  color: "var(--text-secondary)",
                  backgroundColor: "var(--warm-neutral)",
                }
          }
          disabled={!canSubmit}
        >
          Create
        </motion.button>
      </form>
    </div>
  );
}
