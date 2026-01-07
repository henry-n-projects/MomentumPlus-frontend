interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function AnalyticsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
}: AnalyticsCardProps) {
  return (
    <div
      className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col gap-3"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p style={{ fontSize: "14px", fontWeight: 400, color: "#718096" }}>
            {title}
          </p>
          <p
            style={{
              fontSize: "36px",
              fontWeight: 600,
              color: "#2D3748",
              lineHeight: 1.2,
              marginTop: "8px",
            }}
          >
            {value}
          </p>
        </div>
        {icon && (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#D9ECF2" }}
          >
            {icon}
          </div>
        )}
      </div>
      {(subtitle || trend) && (
        <div className="flex items-center gap-2">
          {trend && (
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: trend.isPositive ? "#10B981" : "#EF4444",
              }}
            >
              {trend.value}
            </span>
          )}
          {subtitle && (
            <span
              style={{ fontSize: "14px", fontWeight: 400, color: "#718096" }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
