import { useState } from "react";
import { Minus, X } from "lucide-react";
import { motion } from "motion/react";
import type { TagType } from "../../types/tag";

interface RemoveTagProps {
  onRemoveTag: (tagId: String) => void;
  tags: TagType[];
}

export function RemoveTag({ onRemoveTag, tags }: RemoveTagProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState<String>();
  const handleRemoveTag = (tagId: String) => {
    onRemoveTag(tagId);
    handleClose();
  };

  const handleClose = () => {
    setIsDeleting(false);
    setSelectedTagId(undefined);
  };

  return (
    <div className="space-y-4">
      {isDeleting && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/60"
          onClick={() => handleClose()}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold text[var(--text-primary)] mb-2">
                Delete Tag
              </h3>
              <button
                onClick={() => {
                  handleClose();
                }}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {tags.length > 0 &&
                tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => setSelectedTagId(tag.id)}
                    className={`px-3 py-1.5 rounded-full transition-all font-normal text-sm text-[var(--text-primary)] mr-2 mb-2 ${
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
              {tags.length === 0 && (
                <p className="text-sm text-[var(--accent-red)] mt-2">
                  Please create at least one tag first
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <motion.button
                onClick={() => selectedTagId && handleRemoveTag(selectedTagId)}
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
          Delete a Tag
        </motion.button>
      )}
    </div>
  );
}
