export interface DistractionResponse {
  status: string;
  data: {
    session_id: string;
    name: string;
    ocurred_at: string;
  };
}

export interface DistractionRequestBody {
  name: string;
}
