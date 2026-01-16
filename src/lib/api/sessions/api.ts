import type {
  AddSessionBody,
  AddSessionResponse,
  AddTagBody,
  AddTagResponse,
  UpdateSessionBody,
  UpdateSessionResponse,
} from "../../../types/sessions";

export async function createTag(body: AddTagBody): Promise<AddTagResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sessions/tags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create tag");
  }

  return res.json();
}

export async function addSession(
  body: AddSessionBody
): Promise<AddSessionResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/sessions/session/add`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create new session");
  }

  return res.json();
}

export async function updateSession(
  sessionId: string,
  body: UpdateSessionBody
): Promise<UpdateSessionResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/sessions/update/${sessionId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update session");
  }

  return res.json();
}

export async function deleteSession(sessionId: string): Promise<void> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/sessions/delete/${sessionId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!res.ok) {
    let message = "Failed to delete session";

    try {
      const err = await res.json();
      message = err.message ?? message;
    } catch {}

    throw new Error(message);
  }
}

export async function addTag(body: AddTagBody): Promise<AddTagResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sessions/add/tag`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create new tag");
  }

  return res.json();
}

export async function deleteTag(id: String): Promise<void> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/sessions/delete/tag/${id}`,
    {
      credentials: "include",
      method: "DELETE",
    }
  );

  if (!res.ok) {
    let message = "Failed to delete tag";

    try {
      const err = await res.json();
      message = err.message ?? message;
    } catch {}

    throw new Error(message);
  }

  return;
}
