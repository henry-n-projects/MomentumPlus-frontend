interface DayProgressProps {
  label: string;
  value: string | number;
  bgColor?: string;
}

export function DayCard({ label, value, bgColor }: DayProgressProps) {
  return (
    <div
      className="rounded-[24px] p-6 shadow-[0_4px-20px_rgba(0,0,0,0.05)]"
      style={{ backgroundColor: bgColor }}
    >
      <p className="text-textSecondary mb-2">
        <small>{label}</small>
      </p>
      <p className="text-textPrimary">
        <strong>{value}</strong>
      </p>
    </div>
  );
}
