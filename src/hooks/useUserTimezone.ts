import { useEffect } from "react";
import { useCurrentUser } from "./useUser";

export function useUserTimezone() {
  const { data: user, isLoading } = useCurrentUser();

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("Detected timezone:", timezone);
    if (!user) return;

    // Only set timezone if user is new / still default
    if (user.timezone !== "UTC") return;

    fetch(`${import.meta.env.VITE_API_URL}/user/timezone`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timezone }),
    });
  }, [user, isLoading]);
}
