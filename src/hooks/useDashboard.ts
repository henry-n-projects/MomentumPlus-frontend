import { useQuery } from "@tanstack/react-query";
import type { DashboardResponse } from "../types/dashboard";
import { api } from "../lib/getApi";
export function useDashboard() {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: () => api.get("/dashboard"),
  });
}
