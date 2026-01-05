import { Calendar, Clock, Trash2, Edit } from "lucide-react";
import type { TagType } from "../../types/tag";
import type { SessionAndTag } from "../../types/session";
import { formatDate, formatTime } from "../../lib/utils";

import { motion } from "motion/react";
interface SessionListProps {
  sessions: SessionAndTag[];
  tags: TagType[];
  title: string;
  emptyMessage: string;
  onEdit: (sessionId: string) => void;
  onDelete: (sessionId: string) => void;
}

export function SessionList({
  sessions,
  tags,
  title,
  emptyMessage,
  onEdit,
  onDelete,
}: SessionListProps) {
  const getTagById = (tagId: string) => tags.find((tag) => tag.id === tagId);

  if (sessions.length === 0) {
    return (
      <div className="p-6 rounded-3xl bg-white shadow-lg">
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
          {title}
        </h3>
        <p className="text-base text-[var(--text-secondary)] text-center py-8">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-white shadow-lg">
      <h3 className="text-xl text-[var(--text-primary)] mb-4 font-semibold">
        {title}
      </h3>

      <div className="space-y-3">
        {sessions.map((session) => {
          const tag = getTagById(session.tag.id);

          return (
            <div
              key={session.id}
              className="p-4 rounded-2xl bg-[var(--warm-neutral)] shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-base font-medium text-[var(--text-primary)] truncate ">
                      {session.name}
                    </h4>
                    {tag && (
                      <span
                        className="px-2 py-0.5 rounded-full shrink-0 text-white text-sm font-medium"
                        style={{
                          backgroundColor: tag.color,
                        }}
                      >
                        {tag.name}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(new Date(session.start_at))}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(new Date(session.start_at))}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onEdit && (
                    <motion.button
                      type="button"
                      onClick={() => onEdit(session.id)}
                      className="rounded-lg bg-[var(--off-white)] p-2 border border-[var(--text-primary)]"
                      whileHover={{ scale: 1.03 }}
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                  )}

                  {onDelete && (
                    <motion.button
                      type="button"
                      onClick={() => onDelete(session.id)}
                      className="rounded-lg bg-[var(--off-white)] p-2 border border-red-600"
                      whileHover={{ scale: 1.03 }}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
