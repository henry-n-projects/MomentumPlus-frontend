export interface Break {
  id: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
}

export interface BreakType {
  type: "SHORT" | "LONG" | "CUSTOM";
}
