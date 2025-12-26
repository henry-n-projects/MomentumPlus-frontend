import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type SessionResponse,
  type ScheduledSessionsResponse,
  type ActiveSessionResponse,
} from "../types/session";
import { api } from "../lib/getApi";
import {
  endSessionBreak,
  startSession,
  startSessionBreak,
  endSession,
  addSessionDistraction,
} from "../lib/postApi";
import type { DistractionRequestBody } from "../types/distraction";
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
    enabled: !!sessionId, // Dont run until id provided
  });
}

export function useStartSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => startSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "sessions", "session"],
      });
    },
  });
}

export function useEndSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => endSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
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

export function useActiveSession() {
  return useQuery<ActiveSessionResponse>({
    queryKey: ["active_session"],
    queryFn: () => api.get("/sessions/active"),
  });
}
