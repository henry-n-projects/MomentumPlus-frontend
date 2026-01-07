import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FocusBalanceProps {
  data: Array<{
    tag: string;
    hours: number;
    target: number;
  }>;
}

export function FocusBalance({ data }: FocusBalanceProps) {
  return (
    <div
      className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="mb-6">
        <h3
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#2D3748",
            marginBottom: "8px",
          }}
        >
          Focus Balance
        </h3>
        <p style={{ fontSize: "14px", fontWeight: 400, color: "#718096" }}>
          Time distribution across your focus areas
        </p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5D7CF"
            strokeOpacity={0.3}
          />
          <XAxis
            type="number"
            stroke="#718096"
            style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="tag"
            stroke="#718096"
            style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px" }}
            tickLine={false}
            width={80}
          />
          <Tooltip
            formatter={(value: number) => `${value} hours`}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              padding: "12px",
              fontFamily: "Manrope, sans-serif",
            }}
          />
          <Bar
            dataKey="target"
            fill="#E5D7CF"
            radius={[0, 8, 8, 0]}
            name="Target"
          />
          <Bar
            dataKey="hours"
            fill="#A3C9E0"
            radius={[0, 8, 8, 0]}
            name="Actual"
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex items-center gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#A3C9E0" }}
          ></div>
          <span style={{ fontSize: "14px", fontWeight: 400, color: "#718096" }}>
            Actual
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#E5D7CF" }}
          ></div>
          <span style={{ fontSize: "14px", fontWeight: 400, color: "#718096" }}>
            Target
          </span>
        </div>
      </div>
    </div>
  );
}
