import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion } from "motion/react";
import type { AddTagBody } from "../../types/sessions";

interface AddTagProps {
  onAddTag: (tag: AddTagBody) => void;
}

const PRESET_COLORS = [
  "#e0a3a3", // red
  "#f2cb90", // orange
  "#efe79a", // yellow
  "#a6e0a3", // green
  "#A3C9E0", // blue
  "#C8B6E2", // purple
  "#FFB6C1", // pink
  "#E5D7CF", // Warm Neutral Dark
];

export function AddTag({ onAddTag }: AddTagProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      const newTag: AddTagBody = {
        name: newTagName.trim(),
        color: selectedColor,
      };
      onAddTag(newTag);
      setNewTagName(""); // reset input
      setSelectedColor(PRESET_COLORS[0]); // reset color
      setIsCreating(false); // close manager
    }
  };

  return (
    <div className="space-y-4">
      {isCreating && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/60"
          onClick={() => setIsCreating(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold text[var(--text-primary)] mb-6">
                Add Tag
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewTagName("");
                  setSelectedColor(PRESET_COLORS[0]);
                }}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label
                  className="block mb-2"
                  style={{ fontSize: "14px", color: "var(--text-secondary)" }}
                >
                  Tag Name
                </label>
                <input
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Enter tag name"
                  className="rounded-full bg-[var(--warm-neutral)] px-4 py-0.5 shadow"
                />
              </div>

              <div>
                <label
                  className="block mb-2"
                  style={{ fontSize: "14px", color: "var(--text-secondary)" }}
                >
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full transition-all ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-offset-white"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <motion.button
                  onClick={handleCreateTag}
                  className="w-full rounded-full py-2 shadow-lg"
                  whileHover={
                    !newTagName.trim() || !selectedColor ? {} : { scale: 1.01 }
                  }
                  disabled={!newTagName.trim() || !selectedColor}
                  style={
                    !newTagName.trim() || !selectedColor
                      ? {
                          color: "var(--text-secondary)",
                          backgroundColor: "var(--warm-neutral)",
                        }
                      : {
                          color: "var(--text-primary)",
                          backgroundColor: "var(--soft-blue)",
                        }
                  }
                >
                  Create
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isCreating && (
        <motion.button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-opacity text-[var(--text-primary)] bg-[var(--soft-blue)]"
          whileHover={{ scale: 1.03 }}
        >
          <Plus className="w-4" />
          Add Custom Tag
        </motion.button>
      )}
    </div>
  );
}
