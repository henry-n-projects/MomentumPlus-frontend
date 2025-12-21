import type { UserObject } from "./user";

export interface DashboardResponse {
  status: string;
  data: {
    user: UserObject;
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
