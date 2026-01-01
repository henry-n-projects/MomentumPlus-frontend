export interface Break {
  id: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
}

export interface SessionBreak {
  id: string;
  start_time: string;
  end_time: string | null;
}
