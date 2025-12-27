import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Keep data fresh for 5 minutes (prevents unnecessary refetches)
      staleTime: 5 * 60 * 1000,
      // Cache data for 10 minutes even when component unmounts
      gcTime: 10 * 60 * 1000,
      // Refetch on window focus to keep data up-to-date
      refetchOnWindowFocus: true,
      // Don't refetch on reconnect if data is still fresh
      refetchOnReconnect: true,
    },
  },
});
