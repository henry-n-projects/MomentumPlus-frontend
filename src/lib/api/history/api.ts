export async function getHistoryList(params: URLSearchParams) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/history?${params.toString()}`,
    {
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch history list");
  }

  return res.json();
}

export async function getSessionHistory(Id: string) {
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
