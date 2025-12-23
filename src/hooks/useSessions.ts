import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type SessionResponse,
  type ScheduledSessionsResponse,
} from "../types/session";
import { api } from "../lib/getApi";
import {
  endSessionBreak,
  startSession,
  startSessionBreak,
  stopSession,
} from "../lib/postApi";
import type { BreakType } from "../types/break";

export function useScheduledSessions() {
  return useQuery<ScheduledSessionsResponse>({
    queryKey: ["sessions", "scheduled"],
    queryFn: () => api.get("/sessions/scheduled"),
  });
}

export function useSession(sessionId: string) {
  return useQuery<SessionResponse>({
    queryKey: ["session", sessionId],
    queryFn: () => api.get(`/sessions/${sessionId}`),
    enabled: !!sessionId, // dont run until id provided
    refetchInterval: (query) => {
      // refetch every 30 sec if session in progress
      return query.state.data?.data.session.status === "IN_PROGRESS"
        ? 30_000
        : false;
    },
  });
}

export function useStartSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => startSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useStopSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => stopSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useStartSessionBreak() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, type }: { sessionId: string; type: BreakType }) =>
      startSessionBreak(sessionId, type),

    onSuccess: (_data, variables) => {
      // Refresh dashboard + active session data
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({
        queryKey: ["session", variables.sessionId],
      });
    },
  });
}

export function useEndSessionBreak() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      breakId,
    }: {
      sessionId: string;
      breakId: string;
    }) => endSessionBreak(sessionId, breakId),
    onSuccess: (_data, variables) => {
      // Refresh dashboard + active session data
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({
        queryKey: ["session", variables.sessionId],
      });
    },
  });
}
