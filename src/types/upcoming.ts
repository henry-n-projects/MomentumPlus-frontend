import type { SessionAndTag } from "./session";
import type { Tag } from "./tag";

export interface AddSessionsResponse {
  status: string;
  data: {
    id: string;
    name: string;
    start_at: string;
    end_at: string;
    status: string;
    break_time: number;
    tag: Tag;
  };
}

export interface SessionsResponse {
  status: string;
  data: {
    id: string;
    name: string;
    start_at: string;
    end_at: string;
    status: string;
    break_time: number;
    tag: Tag;
  }[];
}

export interface AddSessionBody {
  name: string;
  start_at: string;
  end_at: string;
  tag_id: string;
  new_tag_name: string | null;
  new_tag_color: string | null;
}

export interface AddSessionResponse {
  status: string;
  data: SessionAndTag;
}

export interface UpdateSessionBody {
  name: string | null;
  start_at: string;
  tag_id: string;
}

export interface UpdateSessionResponse {
  status: string;
  data: SessionAndTag;
}

export interface AddTagBody {
  name: string;
  color: string;
}

export interface AddTagResponse {
  status: string;
  data: Tag;
}

export interface TagResponse {
  status: string;
  data: Tag[];
}
