import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // We can use api.post if we add it, or fetch directly here since api.ts only has get.
      // Given api.ts logic, let's stick to fetch for POST or expand api.ts.
      // For now, I'll stick to a direct fetch or expand api.ts if I want consistency.
      // Looking at previous AppLayout, it used fetch.
      // However, to keep it clean, let's use fetch here directly but with the same base URL logic.
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      navigate("/");
    },
  });
};
