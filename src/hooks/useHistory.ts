import { useQuery } from "@tanstack/react-query";
import type {
  AllSessionsHistoryResponse,
  SessionHistory,
} from "../types/history";
import { getHistoryList, getSessionHistory } from "../lib/api/history/api";

export function useHistoryList(days: number, id: string) {
  useQuery<AllSessionsHistoryResponse>({
    queryKey: ["history"],
    queryFn: () => getHistoryList(days, id),
  });
}

export function useSessionHistory(id: string) {
  useQuery<SessionHistory>({
    queryKey: ["history", id],
    queryFn: () => getSessionHistory(id),
  });
}
