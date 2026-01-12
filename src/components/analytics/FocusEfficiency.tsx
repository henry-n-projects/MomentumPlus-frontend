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
    { name: "Focus Time", value: focusMinutes, color: "#A3C9E0" },
    { name: "Break Time", value: breakMinutes, color: "#E5D7CF" },
  ];

  return (
    <div
      className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <h3
        style={{
          fontSize: "24px",
          fontWeight: 600,
          color: "#2D3748",
          marginBottom: "24px",
        }}
      >
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
            <p style={{ fontSize: "36px", fontWeight: 600, color: "#2D3748" }}>
              {focusPercentage}%
            </p>
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#718096" }}>
              Efficiency
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div
          className="flex items-center justify-between p-4 rounded-2xl"
          style={{ backgroundColor: "#D9ECF2" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#A3C9E0" }}
            ></div>
            <span
              style={{ fontSize: "16px", fontWeight: 600, color: "#2D3748" }}
            >
              Focus Time
            </span>
          </div>
          <div className="text-right">
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#2D3748" }}>
              {Math.floor(focusMinutes / 60)}h {Math.floor(focusMinutes % 60)}m
            </p>
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#718096" }}>
              {focusPercentage}%
            </p>
          </div>
        </div>

        <div
          className="flex items-center justify-between p-4 rounded-2xl"
          style={{ backgroundColor: "#F4F2EF" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#E5D7CF" }}
            ></div>
            <span
              style={{ fontSize: "16px", fontWeight: 600, color: "#2D3748" }}
            >
              Break Time
            </span>
          </div>
          <div className="text-right">
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#2D3748" }}>
              {Math.floor(breakMinutes / 60)}h {Math.floor(breakMinutes % 60)}m
            </p>
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#718096" }}>
              {breakPercentage}%
            </p>
          </div>
        </div>
      </div>

      <div
        className="mt-6 p-4 rounded-2xl"
        style={{ backgroundColor: "rgba(200, 182, 226, 0.1)" }}
      >
        <p
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#2D3748",
            marginBottom: "4px",
          }}
        >
          💡 Insight
        </p>
        <p style={{ fontSize: "14px", fontWeight: 400, color: "#718096" }}>
          Your focus-to-break ratio is optimal for sustained productivity. Keep
          maintaining this balance!
        </p>
      </div>
    </div>
  );
}
