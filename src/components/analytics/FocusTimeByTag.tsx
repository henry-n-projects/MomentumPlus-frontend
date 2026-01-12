import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface FocusTimeByTagProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function FocusTimeByTag({ data }: FocusTimeByTagProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-8">
        Focus Time by Tag
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
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
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "14px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
