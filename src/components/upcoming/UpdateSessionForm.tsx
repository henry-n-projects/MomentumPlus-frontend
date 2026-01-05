import { useEffect, useState } from "react";

import { Calendar, Clock, Edit } from "lucide-react";
import type { TagType } from "../../types/tag";
import type { SessionAndTag } from "../../types/session";

interface SessionUpdateFormProps {
  sessions: SessionAndTag[];
  tags: TagType[];
  onUpdateSession: (session: SessionAndTag) => void;
}

export function SessionUpdateForm({
  sessions,
  tags,
  onUpdateSession,
}: SessionUpdateFormProps) {
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");

  // Load selected session data into form
  useEffect(() => {
    if (selectedSessionId) {
      const session = sessions.find((s) => s.id === selectedSessionId);
      if (session) {
        setSessionName(session.name ?? "");

        const date = new Date(session.start_at);
        const dateStr = date.toISOString().split("T")[0];
        const timeStr = date.toTimeString().slice(0, 5);

        setSelectedDate(dateStr);
        setSelectedTime(timeStr);
        setSelectedTagId(session.tag.id);
      }
    } else {
      setSessionName("");
      setSelectedDate("");
      setSelectedTime("");
      setSelectedTagId("");
    }
  }, [selectedSessionId, sessions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !selectedSessionId ||
      !sessionName.trim() ||
      !selectedDate ||
      !selectedTime ||
      !selectedTagId
    ) {
      return;
    }

    const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const session = sessions.find((s) => s.id === selectedSessionId);

    if (!session) return;

    const updatedSession: SessionAndTag = {
      ...session,
      name: sessionName.trim(),
      start_at: scheduledDateTime.toLocaleString(),
      tag: {
        ...session.tag,
        id: selectedTagId,
      },
    };

    onUpdateSession(updatedSession);

    // Reset form
    setSelectedSessionId("");
    setSessionName("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedTagId("");
  };

  const getTagById = (tagId: string) => tags.find((tag) => tag.id === tagId);

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
            Select Session
          </label>
          <select
            value={selectedSessionId}
            onChange={(e) => setSelectedSessionId(e.target.value)}
            className="w-full mt-2 px-4 py-2 rounded-xl bg-[#F4F2EF] border-none"
            style={{ fontSize: "14px", color: "#2D3748" }}
          >
            <option value="">Choose a session to update</option>
            {sessions.map((session) => {
              const tag = getTagById(session.tag.id);
              return (
                <option key={session.id} value={session.id}>
                  {session.name} - {tag?.name}
                </option>
              );
            })}
          </select>
        </div>

        {selectedSessionId && (
          <>
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
          </>
        )}
      </form>
    </div>
  );
}
