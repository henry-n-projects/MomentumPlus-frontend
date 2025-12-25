export interface Distraction {
  status: string;
  data: {
    session_id: string;
    name: string;
    ocured_at: string;
  };
}

export interface DistractionRequestBody {
  name: string;
}
