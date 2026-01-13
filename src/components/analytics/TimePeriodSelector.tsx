interface TimePeriodSelectorProps {
  selected: "week" | "month";
  onChange: (period: "week" | "month") => void;
}

export function TimePeriodSelector({
  selected,
  onChange,
}: TimePeriodSelectorProps) {
  return (
    <div className="inline-flex rounded-2xl p-1 shadow-xl bg-white">
      <button
        onClick={() => onChange("week")}
        className="px-6 py-2 rounded-2xl text-medium font-semibold transition-all"
        style={{
          backgroundColor:
            selected === "week" ? "var(--soft-blue)" : "transparent",
          color: selected === "week" ? "white" : "var(--text-secondary)",
        }}
      >
        Last Week
      </button>
      <button
        onClick={() => onChange("month")}
        className="px-6 py-2 rounded-2xl text-medium font-semibold transition-all"
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          backgroundColor:
            selected === "month" ? "var(--soft-blue)" : "transparent",
          color: selected === "month" ? "#FFFFFF" : "var(--text-secondary)",
        }}
      >
        Last 30 Days
      </button>
    </div>
  );
}
