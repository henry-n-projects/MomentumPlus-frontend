import type {
  DistractionResponse,
  DistractionRequestBody,
} from "../../../types/distraction";
import type {
  SessionBreakEndResponse,
  SessionBreakStartResponse,
  SessionStartResponse,
  SessionStopResponse,
} from "../../../types/record";

// FETCH WRAPPERS
export async function startSession(
  sessionId: string
): Promise<SessionStartResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/record/${sessionId}/start`,
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

export async function endSession(
  sessionId: string
): Promise<SessionStopResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/record/${sessionId}/stop`,
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
  sessionId: string
): Promise<SessionBreakStartResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/record/${sessionId}/breaks/start`,

    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
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
    `${import.meta.env.VITE_API_URL}/record/${id}/breaks/${breakId}/end`,
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

export async function addSessionDistraction(
  sessionId: string,
  body: DistractionRequestBody
): Promise<DistractionResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/record/${sessionId}/distraction`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to add distraction: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
}
