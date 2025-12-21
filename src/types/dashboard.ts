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
    week_progress: WeekProgress;
    weekly_activities: [WeeklyActivity];
    today: {
      date: string;
      sessions: [Session];
    };
  };
}

export interface WeeklyActivity {
  date: string;
  focus_minutes: number;
}

export interface WeekProgress {
  scheduled_count: number;
  completed_count: number;
}

export interface Session {
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
