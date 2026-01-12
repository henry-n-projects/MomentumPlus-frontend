import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface FocusEfficiencyProps {
  focusMinutes: number;
  breakMinutes: number;
}

export function FocusEfficiency({
  focusMinutes,
  breakMinutes,
}: FocusEfficiencyProps) {
  const total = focusMinutes + breakMinutes;
  const focusPercentage = Number.isNaN(focusMinutes / total)
    ? 0
    : Math.round((focusMinutes / total) * 100);
  const breakPercentage = Number.isNaN(breakMinutes / total)
    ? 0
    : Math.round((breakMinutes / total) * 100);

  const data = [
    { name: "Focus Time", value: focusMinutes, color: "var(--soft-blue)" },
    {
      name: "Break Time",
      value: breakMinutes,
      color: "var(--warm-neutral-dark)",
    },
  ];

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-xl">
      <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-8">
        Focus Efficiency
      </h3>

      <div className="flex items-center justify-center mb-6">
        <div className="relative" style={{ width: "200px", height: "200px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-4xl font-semibold text-[var(--text-primary)]">
              {focusPercentage}%
            </p>
            <p className="text-sm font-normal text-[var(--text-secondary)]">
              Efficiency
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--soft-blue-light)]">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[var(--soft-blue)]"></div>
            <span className="text-base font-semibold text-[var(--text-primary)]">
              Focus Time
            </span>
          </div>
          <div className="text-right">
            <p className="text-base font-semibold text-[var(--text-primary)]">
              {Math.floor(focusMinutes / 60)}h {Math.floor(focusMinutes % 60)}m
            </p>
            <p className="text-sm font-normal text-[var(--text-secondary)]">
              {focusPercentage}%
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--warm-neutral)]">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[var(--warm-neutral-dark)]"></div>
            <span className="font-semibold text-[var(text-primary)]">
              Break Time
            </span>
          </div>
          <div className="text-right">
            <p className="text-base font-semibold text-[var(--text-primary)]">
              {Math.floor(breakMinutes / 60)}h {Math.floor(breakMinutes % 60)}m
            </p>
            <p className="text-sm font-normal text-[var(--text-secondary)]">
              {breakPercentage}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
