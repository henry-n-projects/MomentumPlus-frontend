import { Filter } from "lucide-react";

interface TagFiltersProps {
  tags: {
    id: string;
    name: string;
    color: string;
  }[];
  onTagChange: (tagId: string | null) => void;
  selectedTag: string | null;
}

export function TagFilters({
  tags,
  onTagChange,
  selectedTag,
}: TagFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6 ">
      {/* Tag Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-[var(--text-secondary)]" />
        <select
          value={selectedTag ?? "all"}
          onChange={(e) =>
            onTagChange(e.target.value === "all" ? null : e.target.value)
          }
          className="w-[180px] px-3 py-2 rounded-lg border border border-[var(--soft-blue-light)] text-[var(--text-primary)] bg-white shadow"
        >
          <option value="all">All tags</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
