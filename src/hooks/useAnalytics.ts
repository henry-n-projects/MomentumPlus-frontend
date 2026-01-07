import { useQuery } from "@tanstack/react-query";
import type { AnalyticsResponse } from "../types/analytics";
import { api } from "../lib/api/get/api";

export function useAnalytics() {
  return useQuery<AnalyticsResponse>({
    queryKey: ["analytics"],
    queryFn: () => api.get("/analytics"),
  });
}
