export const api = {
  get: async (url: string) => {
    console.log("API Fetch:", `${import.meta.env.VITE_API_URL}${url}`);
    const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  },
};
