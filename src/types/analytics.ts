import type { TagType } from "./tag";

export interface AnalyticsResponse {
  status: string;
  data: {
    range: {
      from: string;
      to: string;
      days: number;
    };
    streak: number;
    completion_rate: number;
    completed_count: number;
    scheduled_count: number;
    time_per_tag: {
      tag: {
        id: string;
        name: string;
        color: string;
      };
      focus_minutes: number;
    };
    sessions: {
      id: string;
      name: string;
      start_at: string;
      end_at: string;
      status: string;
      net_minutes: number;
      break_minutes: number;
      tag: TagType;
    };
  };
}
