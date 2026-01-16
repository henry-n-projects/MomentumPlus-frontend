import { useState } from "react";
import { Delete, Minus, Plus, X } from "lucide-react";
import { motion } from "motion/react";
import type { AddTagBody } from "../../types/sessions";
import type { TagType } from "../../types/tag";

interface RemoveTagProps {
  onRemoveTag: (tag: AddTagBody) => void;
  tags: TagType[];
}

export function RemoveTag({ onRemoveTag, tags }: RemoveTagProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState<String>();
  const handleRemoveTag = () => {
    onRemoveTag;
  };

  return (
    <div className="space-y-4">
      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/60">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-8 shadow-xl">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-semibold text[var(--text-primary)] mb-6">
                Delete Tag
              </h3>
              <button
                onClick={() => {
                  setIsDeleting(false);
                }}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
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

            <div className="flex gap-3 pt-2">
              <motion.button
                onClick={handleRemoveTag}
                className="w-full rounded-full py-2 shadow-lg"
                whileHover={!selectedTagId ? {} : { scale: 1.01 }}
                disabled={!selectedTagId}
                style={
                  !selectedTagId
                    ? {
                        color: "var(--text-secondary)",
                        backgroundColor: "var(--warm-neutral)",
                      }
                    : {
                        color: "var(--text-primary)",
                        backgroundColor: "var(--accent-purple)",
                      }
                }
              >
                Remove
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {!isDeleting && (
        <motion.button
          onClick={() => setIsDeleting(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-opacity text-[var(--text-primary)] bg-[var(--accent-purple)]"
          whileHover={{ scale: 1.03 }}
        >
          <Minus className="w-4" />
          Remove a Tag
        </motion.button>
      )}
    </div>
  );
}
