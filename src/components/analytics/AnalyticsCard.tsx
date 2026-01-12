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
}: AnalyticsCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-normal text-[var(--text-secondary)]">
            {title}
          </p>
          <p className="text-4xl font-semibold text-[var(--text-primary)] mt-2 leading-tight">
            {value}
          </p>
        </div>
        {icon && (
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--soft-blue-light)]">
            {icon}
          </div>
        )}
      </div>
      {subtitle && (
        <div className="flex items-center gap-2">
          {subtitle && (
            <span className="text-sm font-normal text-[var(--text-secondary)]">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
