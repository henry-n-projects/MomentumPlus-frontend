import type { SessionAndTag } from "./record";
import type { UserObject } from "./user";

export interface DashboardResponse {
  status: string;
  data: {
    user: UserObject;
    week_progress: WeekProgress;
    weekly_activities: [WeeklyActivity];
    today: {
      date: string;
      sessions: [SessionAndTag];
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
