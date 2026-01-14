export async function getHistoryList(days: number, tagId: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/history?days=${days}&${tagId}`,
    {
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch history list");
  }
  return res.json();
}

export async function getSessionList(Id: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/history?days=${Id}`,
    {
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch session history");
  }
  return res.json();
}
