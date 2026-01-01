export interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagBadgeProps {
  tag: Tag;
}

export function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full transition-opacity
      }`}
      style={{
        backgroundColor: tag.color,
        color: "#FFFFFF",
      }}
    >
      <span style={{ fontSize: "var(--text-small)" }}>{tag.name}</span>
    </span>
  );
}
