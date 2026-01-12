export async function getAnalytics(days: number) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/analytics?days=${days}`,
    {
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }
  return res.json();
}
