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
      distractions: {
        name: string;
      }[];
      breaks: {
        id: string;
        start_time: string;
        end_time: string;
      }[];
    }[];
    tags: {
      id: string;
      name: string;
    }[];
  };
}

export interface SessionHistory {
  id: string;
  name: string;
  start_at: string;
  end_at: string;
  focus_minutes: number;
  break_time: number;
  break_count: number;
  distraction_count: number;
  tag: TagType | null;
  distractions: {
    name: string;
  }[];
  breaks: {
    id: string;
    start_time: string;
    end_time: string;
  }[];
}
