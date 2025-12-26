import type { Break } from "./break";

export interface ScheduledSessionsResponse {
  status: string;
  data: SessionAndTag[];
}

export interface SessionAndTag {
  id: string;
  name: string;
  start_at: string;
  end_at: string;
  status: string;
  break_time: number;
  tag: {
    id: string;
    name: string;
    color: string;
  };
}

export interface SessionResponse {
  status: string;
  data: {
    session: SessionAndTag;
    activity: SessionActivity;
  };
}

export interface SessionActivity {
  total_minutes: number;
  focus_minutes: number;
  break_minutes: number;
  breaks: SessionBreak[];
  distractions: [
    {
      id: string;
      name: string;
      occurred_at: string;
    }
  ];
}

export interface SessionBreak {
  id: string;
  start_time: string;
  end_time: string | null;
}

export interface SessionStartResponse {
  status: string;
  data: {
    id: string;
    status: string;
    start_at: string;
  };
}

export interface SessionStopResponse {
  status: string;
  data: {
    session: Session;
  };
}

export interface Session {
  id: string;
  status: string;
  start_at: string;
  end_at: string;
  break_time: number;
}

export interface SessionBreakStartResponse {
  status: string;
  data: {
    break: SessionBreak;
  };
}
export interface SessionBreakEndResponse {
  status: string;
  data: {
    break: Break;
    session: {
      id: string;
      break_time: number;
    };
  };
}

export interface ActiveSessionResponse {
  status: string;
  data: ActiveSession | null;
}

export interface ActiveSession {
  session: {
    id: string;
    name: string;
    status: string;
    start_at: string;
    end_at: string;
  };
  tag: {
    id: string;
    name: string;
    color: string;
  };
  active_break: {
    id: string;
    session_id: string;
    start_time: string;
    end_time: string;
  } | null;
  breaks: {
    id: string;
    session_id: string;
    start_time: string;
    end_time: string;
  }[];
  distractions: {
    id: string;
    name: string;
    occurred_at: string;
  };
}
