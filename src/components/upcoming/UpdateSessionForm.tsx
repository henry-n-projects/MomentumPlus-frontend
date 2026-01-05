import { useEffect, useState } from "react";

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

  // Load selected session data into form
  useEffect(() => {
    if (sessionToEdit) {
      const date = new Date(sessionToEdit.start_at);
      const dateStr = date.toISOString().split("T")[0];
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
      start_at: scheduledDateTime.toLocaleString(),
      tag_id: selectedTagId,
    };

    onUpdateSession(sessionToEdit.id, updatedSession);
  };

  if (!sessionToEdit) {
    return (
      <div
        className="p-6 rounded-3xl bg-white"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Edit className="w-5 h-5" style={{ color: "#718096" }} />
          <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2D3748" }}>
            Update Session
          </h3>
        </div>
        <p className="text-center text-[#718096]">Select a session to edit</p>
      </div>
    );
  }

  return (
    <div
      className="p-6 rounded-3xl bg-white"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Edit className="w-5 h-5" style={{ color: "#718096" }} />
        <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2D3748" }}>
          Update Session
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label style={{ fontSize: "14px", color: "#718096" }}>
            Session Name
          </label>
          <input
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            placeholder="Focus work session"
            className="mt-2 rounded-xl bg-[#F4F2EF] border-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={{ fontSize: "14px", color: "#718096" }}>
              <Calendar className="w-4 h-4 inline mr-1" />
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-2 rounded-xl bg-[#F4F2EF] border-none"
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "14px", color: "#718096" }}>
              <Clock className="w-4 h-4 inline mr-1" />
              Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="mt-2 rounded-xl bg-[#F4F2EF] border-none"
              required
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: "14px", color: "#718096" }}>Tag</label>
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
                  color: "#2D3748",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl"
          style={{ backgroundColor: "#C8B6E2", color: "#2D3748" }}
          disabled={
            !sessionName.trim() ||
            !selectedDate ||
            !selectedTime ||
            !selectedTagId
          }
        >
          Update Session
        </button>
      </form>
    </div>
  );
}
