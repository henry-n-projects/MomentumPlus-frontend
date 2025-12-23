import type { BreakType } from "../types/break";
import type {
  SessionBreakEndResponse,
  SessionBreakStartResponse,
  SessionStartResponse,
  SessionStopResponse,
} from "../types/session";

export async function startSession(
  sessionId: string
): Promise<SessionStartResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/sessions/${sessionId}/start`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to start session: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function stopSession(
  sessionId: string
): Promise<SessionStopResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/sessions/${sessionId}/stop`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to stop session: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function startSessionBreak(
  sessionId: string,
  type: BreakType
): Promise<SessionBreakStartResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/sessions/${sessionId}/breaks/start`,

    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to start session break: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

export async function endSessionBreak(
  id: string,
  breakId: string
): Promise<SessionBreakEndResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/sessions/${id}/breaks/${breakId}/end`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to end break: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
