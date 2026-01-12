import { useQuery } from "@tanstack/react-query";
import type { AnalyticsResponse } from "../types/analytics";

import { getAnalytics } from "../lib/api/analytics/api";

export function useAnalytics(days: number) {
  return useQuery<AnalyticsResponse>({
    queryKey: ["analytics", days],
    queryFn: () => getAnalytics(days),
  });
}
