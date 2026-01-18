import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api/get/api";
import { type UserObject } from "../types/user";
import { logoutUser } from "../lib/api/auth/api";
import { useNavigate } from "react-router-dom";
export function useCurrentUser() {
  return useQuery<UserObject>({
    queryKey: ["me"],
    queryFn: () => api.get("/auth/me"),
    retry: false,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      navigate("/", { replace: true });
    },
  });
}
