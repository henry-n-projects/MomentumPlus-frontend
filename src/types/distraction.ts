export interface DistractionResponse {
  status: string;
  data: {
    session_id: string;
    name: string;
    occurred_at: string;
  };
}

export interface DistractionRequestBody {
  name: string;
}
