import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion } from "motion/react";
import type { AddTagBody } from "../../types/upcoming";

interface TagManagerProps {
  onAddTag: (tag: AddTagBody) => void;
}

const PRESET_COLORS = [
  "#A3C9E0", // Soft Blue
  "#C8B6E2", // Accent Purple
  "#D9ECF2", // Soft Blue Light
  "#E5D7CF", // Warm Neutral Dark
  "#FFB6C1", // Light Pink
  "#FFDAB9", // Peach
  "#B0E0E6", // Powder Blue
  "#DDA0DD", // Plum
];

export function TagManager({ onAddTag }: TagManagerProps) {
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
      {isCreating ? (
        <div className="p-4 rounded-3xl bg-[var(--off-white)] shadow-lg">
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
                className="flex py-2 px-4 rounded-full shadow-lg"
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
                Create Tag
              </motion.button>
              <motion.button
                onClick={() => {
                  setIsCreating(false);
                  setNewTagName("");
                  setSelectedColor(PRESET_COLORS[0]);
                }}
                className="flex items-center gap-2 rounded-full shadow-lg px-4 py-2 bg-[var(--accent-red)]
                "
                whileHover={{ scale: 1.03 }}
              >
                Cancel
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
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
