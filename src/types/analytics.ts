export interface AnalyticsResponse {
  status: string;
  data: {
    summary: {
      streak: number;
      completed_sessions: number;
      scheduled_sessions: number;
      completed_rate: number;
      total_minutes: number;
    };
    time_per_tag: {
      tag: {
        id: string;
        name: string;
        color: string;
      };
      focus_minutes: number;
      percentage: number;
    }[];

    planning_realism: {
      day: string;
      scheduled: number;
      completed: number;
    }[];
    focus_efficiency: {
      focus_minutes: number;
      break_minutes: number;
      efficiency_rate: number;
    };
    focus_trend: {
      date: string;
      focus_minutes: number;
    }[];
    range: {
      from: string;
      to: string;
      days: number;
    };
  };
}
