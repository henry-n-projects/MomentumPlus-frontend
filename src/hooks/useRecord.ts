import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type SessionResponse,
  type ScheduledSessionsResponse,
  type ActiveSessionResponse,
} from "../types/record";
import { api } from "../lib/api/get/api";
import {
  endSessionBreak,
  startSession,
  startSessionBreak,
  endSession,
  addSessionDistraction,
} from "../lib/api/record/api";
import type { DistractionRequestBody } from "../types/distraction";

export function useScheduledSessions() {
  return useQuery<ScheduledSessionsResponse>({
    queryKey: ["sessions", "scheduled"],
    queryFn: () => api.get("/record/status/scheduled"),
  });
}

export function useActiveSession() {
  return useQuery<ActiveSessionResponse>({
    queryKey: ["active_session"],
    queryFn: () => api.get("/record/status/in-progress"),
  });
}

export function useSession(sessionId: string) {
  return useQuery<SessionResponse>({
    queryKey: ["session", sessionId],
    queryFn: () => api.get(`/record/${sessionId}`),
    enabled: !!sessionId, // Dont run until id provided
  });
}

export function useStartSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => startSession(sessionId),
    onSuccess: (_data, sessionId) => {
      // Refresh dashboard summary
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      // Refresh the specific session
      queryClient.invalidateQueries({ queryKey: ["session", sessionId] });
      // Refresh active session info if you use it
      queryClient.invalidateQueries({ queryKey: ["active_session"] });
      queryClient.invalidateQueries({ queryKey: ["sessions", "scheduled"] });
    },
  });
}

export function useEndSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => endSession(sessionId),
    onSuccess: (_data, sessionId) => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["active_session"] });
      queryClient.invalidateQueries({ queryKey: ["session", sessionId] });
      queryClient.invalidateQueries({ queryKey: ["sessions", "scheduled"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}

export function useStartSessionBreak() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId }: { sessionId: string }) =>
      startSessionBreak(sessionId),

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

export function useAddSessionDistraction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      body,
    }: {
      sessionId: string;
      body: DistractionRequestBody;
    }) => addSessionDistraction(sessionId, body),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["session", variables.sessionId],
      });
    },
  });
}
