import { Calendar, Tag } from "lucide-react";

interface HistoryFiltersProps {
  tags: string[];
  onDateRangeChange: (days: number) => void;
  onTagChange: (tag: string | null) => void;
  selectedDateRange: number;
  selectedTag: string | null;
}

export function HistoryFilters({
  tags,
  onDateRangeChange,
  onTagChange,
  selectedDateRange,
  selectedTag,
}: HistoryFiltersProps) {
  const dateRangeOptions = [
    { value: 7, label: "Last 7 days" },
    { value: 30, label: "Last 30 days" },
    { value: 90, label: "Last 90 days" },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* Date Range Filter */}
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-[var(--text-secondary)]" />
        <div className="flex gap-2">
          {dateRangeOptions.map((option) => (
            <button
              className="rounded-lg p-2"
              key={option.value}
              onClick={() => onDateRangeChange(option.value)}
              style={{
                backgroundColor:
                  selectedDateRange === option.value
                    ? "var(--soft-blue)"
                    : "transparent",
                color:
                  selectedDateRange === option.value
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                borderColor: "var(--soft-blue-light)",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filter */}
      <div className="flex items-center gap-2">
        <Tag className="w-5 h-5 text-[var(--text-secondary)]" />
        <select
          value={selectedTag ?? "all"}
          onChange={(e) =>
            onTagChange(e.target.value === "all" ? null : e.target.value)
          }
          className="w-[180px] px-3 py-2 rounded-lg border border border-[var(--soft-blue-light)] text-[var(--text-primary)] bg-white"
        >
          <option value="all">All tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
