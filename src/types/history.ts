import type { TagType } from "./tag";

export interface AllSessionsHistoryResponse {
  status: string;
  data: {
    range: {
      from: string;
      to: string;
      days: number;
    };
    sessions: {
      id: string;
      name: string;
      start_at: string;
      end_at: string;
      focus_minutes: number;
      break_time: number;
      break_count: number;
      distraction_count: number;
      tag: TagType | null;
    }[];
    tags: {
      id: string;
      name: string;
      color: string;
    }[];
  };
}

export interface SessionHistory {
  status: string;
  data: {
    sessions: {
      id: string;
      name: string;
      status: string;
      start_at: string;
      end_at: string;
      tag: TagType;
      breaks: {
        id: string;
        start_time: string;
        end_time: string;
      }[];
      distractions: {
        name: string;
      }[];
      metrics: {
        focus_minutes: number;
        break_minutes: number;
        break_count: number;
      };
    }[];
  };
}
