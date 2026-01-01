import { useState } from "react";

interface CreateTagDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateTag: () => void;
}
const PRESET_COLORS = [
  "#A3C9E0", // Soft Blue
  "#C8B6E2", // Accent Purple
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#EC4899", // Pink
  "#6366F1", // Indigo
];

const [tagName, setTagName] = useState("");
const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

const handleSubmit = (e: React.FormEvent) => {};

export function CreateTagDialog({
  open,
  onClose,
  onCreateTag,
}: CreateTagDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4">Create New Tag</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="tag-name"
              className="block text-sm font-medium mb-1"
            >
              Tag Name
            </label>
            <input
              id="tag-name"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              className="w-full rounded-xl px-4 py-3 bg-gray-100"
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Choose Color</p>
            <div className="grid grid-cols-8 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${
                    selectedColor === color
                      ? "ring-2 ring-blue-500 scale-110"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2">
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-xl"
            >
              Create Tag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
