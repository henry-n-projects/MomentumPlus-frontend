export interface DashboardResponse {
  status: string;
  data: {
    user: {
      id: string;
      name: string;
      avatar_url: string | null;
      timezone: string;
      settings: JSON;
    };
    week_progress: {
      scheduled_count: number;
      completed_count: number;
    };
    weekly_activities: [
      {
        date: string;
        focus_minutes: number;
      }
    ];
    today: {
      date: string;
      sessions: [
        {
          id: string;
          name: string;
          start_at: string;
          end_at: string | null;
          status: string;
          break_time: number;
          tag: {
            id: string;
            name: string;
            color: string;
          };
        }
      ];
    };
  };
}
