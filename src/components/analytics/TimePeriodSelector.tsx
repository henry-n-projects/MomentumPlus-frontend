interface TimePeriodSelectorProps {
  selected: 7 | 30 | 90;
  onChange: (period: 7 | 30 | 90) => void;
}

export function TimePeriodSelector({
  selected,
  onChange,
}: TimePeriodSelectorProps) {
  return (
    <div className="inline-flex rounded-2xl p-1 shadow bg-white">
      <button
        onClick={() => onChange(7)}
        className="px-6 py-2 rounded-2xl text-medium font-semibold transition-all"
        style={{
          backgroundColor: selected === 7 ? "var(--soft-blue)" : "transparent",
          color: selected === 7 ? "white" : "var(--text-secondary)",
        }}
      >
        Last Week
      </button>
      <button
        onClick={() => onChange(30)}
        className="px-6 py-2 rounded-2xl text-medium font-semibold transition-all"
        style={{
          backgroundColor: selected === 30 ? "var(--soft-blue)" : "transparent",
          color: selected === 30 ? "white" : "var(--text-secondary)",
        }}
      >
        Last 30 Days
      </button>
      <button
        onClick={() => onChange(90)}
        className="px-6 py-2 rounded-2xl text-medium font-semibold transition-all"
        style={{
          backgroundColor: selected === 90 ? "var(--soft-blue)" : "transparent",
          color: selected === 90 ? "white" : "var(--text-secondary)",
        }}
      >
        Last 90 Days
      </button>
    </div>
  );
}
