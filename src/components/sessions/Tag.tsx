import type { TagType } from "../../types/tag";

interface TagProps {
  tag: TagType;
  onClick?: () => void;
  selected?: boolean;
}

export function Tag({ tag, onClick, selected = false }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full transition-all ${
        selected ? "ring-2 ring-offset-2 ring-offset-white" : ""
      }`}
      style={{
        backgroundColor: tag.color,
        color: "var(--warm-neutral)",
        fontWeight: 500,
        fontSize: "14px",
      }}
    >
      {tag.name}
    </button>
  );
}
