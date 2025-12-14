import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { type UserObject } from "../types/user";
export function useCurrentUser() {
  return useQuery<UserObject>({
    queryKey: ["me"],
    queryFn: () => api.get("/auth/me"),
    retry: false,
  });
}
