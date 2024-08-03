import { BackendResponse } from "./base";

export interface GetAuthenticatedUserResponseData {
  id: number;
  first_name: string;
  last_name: string;
  email: 'admin@example.com';
  player: number | null;
  player_avatar: string | null;
}

export interface GetAuthenticatedUserResponse extends BackendResponse {
  data: GetAuthenticatedUserResponseData;
}
