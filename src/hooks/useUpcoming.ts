import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type TagResponse,
  type SessionsResponse,
  type AddSessionBody,
  type UpdateSessionBody,
  type AddTagBody,
} from "../types/upcoming";
import { api } from "../lib/api/get/api";
import {
  addSession,
  addTag,
  createTag,
  deleteSession,
  updateSession,
} from "../lib/api/upcoming/api";

export function useUpcomingSessions() {
  return useQuery<SessionsResponse>({
    queryKey: ["sessions", "upcoming"],
    queryFn: () => api.get("/upcoming"),
    refetchInterval: 60_000,
  });
}

export function usePastScheduledSessions() {
  return useQuery<SessionsResponse>({
    queryKey: ["sessions", "past"],
    queryFn: () => api.get("/upcoming/past"),
    refetchInterval: 60_000,
  });
}

export function useGetTags() {
  return useQuery<TagResponse>({
    queryKey: ["tags"],
    queryFn: () => api.get("/upcoming/tags"),
  });
}

export function useAddSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddSessionBody) => addSession(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
}

export function useUpdateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      body,
    }: {
      sessionId: string;
      body: UpdateSessionBody;
    }) => updateSession(sessionId, body),

    onSuccess: (_data, variables) => {
      // Refresh any screens that show sessions
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });

      // If you have a single-session details query, refresh it too
      queryClient.invalidateQueries({
        queryKey: ["session", variables.sessionId],
      });
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => deleteSession(sessionId),
    onSuccess: (_data, sessionId) => {
      // refresh all data that depends on sessions
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({
        queryKey: ["session", sessionId],
      });
    },
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: AddTagBody) => createTag(body),
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}

export function useAddTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: AddTagBody) => addTag(body),
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}
