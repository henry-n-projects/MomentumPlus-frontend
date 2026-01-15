import { useQuery } from "@tanstack/react-query";
import type {
  AllSessionsHistoryResponse,
  SessionHistory,
} from "../types/history";
import { getHistoryList, getSessionHistory } from "../lib/api/history/api";

export function useHistoryList(days: number, tagId: string | null) {
  const params = new URLSearchParams();
  params.set("days", String(days));

  if (tagId) {
    params.set("tagId", tagId);
  }
  return useQuery<AllSessionsHistoryResponse>({
    queryKey: ["history", days, tagId],
    queryFn: () => getHistoryList(params),
  });
}

export function useSessionHistory(id: string) {
  useQuery<SessionHistory>({
    queryKey: ["history", id],
    queryFn: () => getSessionHistory(id),
  });
}
