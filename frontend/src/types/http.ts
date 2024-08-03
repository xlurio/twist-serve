import {PickerValidDate} from '@mui/x-date-pickers';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';

export enum BackendResponseStatuses {
  SUCCESS = 'success',
  FAIL = 'fail',
  ERROR = 'error',
}

export interface ListRequestQueryParameters {
  page?: number;
  page_size?: number;
}

export interface ListMatchesQueryParameters extends ListRequestQueryParameters {
  player?: number;
  match_round?: number;
}

export interface ListTournamentsQueryParameters
  extends ListRequestQueryParameters {
  ordering?: 'num_of_subscriptions' | '-num_of_subscriptions';
  start_date__gte?: string;
  subscriptions__player__in?: number;
}

export interface ListRoundsQueryParameters extends ListRequestQueryParameters {
  tournament?: number;
}

export interface CreatePlayerRequest {
  avatar: File | null;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  date_of_birth: string;
  hometown_country: string;
  hometown_state_province: string;
  hometown_city: string;
  weight: string;
  height: string;
  best_hand: string;
  backhand: string;
}

export interface GetTokenRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface BackendResponse {
  status: BackendResponseStatuses;
  message?: string;
  data?: object;
}

export interface RetrieveTournamentResponse {
  data: RetrieveTournamentResponseData;
}

export interface RetrieveTournamentResponseData {
  id: number;
  name: string;
  avatar: string | null;
  start_date: string;
  end_date: string;
  country: string;
  city: string;
  surface: string;
  slots: number;
}

export interface CreatePlayerResponse extends BackendResponse {
  data: {
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
    date_of_birth: PickerValidDate;
    hometown_country: string;
    hometown_state_province: string;
    hometown_city: string;
    weight: string;
    height: string;
    best_hand: string;
    backhand: string;
  };
}

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

export interface GetTokenResponse extends BackendResponse {
  data: {
    refresh: string;
    access: string;
    lifetime: string;
  };
}

export interface BackendPaginatedResponseDataResult {}

export interface ListTournamentsResponseDataResult
  extends BackendPaginatedResponseDataResult {
  id: number;
  name: string;
  avatar: string | null;
  start_date: string;
  end_date: string;
  country: string;
  city: string;
}

export interface BackendPaginatedResponseData {
  count: number;
  next: string | null;
  previous: string | null;
  results: BackendPaginatedResponseDataResult[];
}

export interface ListTournamentsResponseData
  extends BackendPaginatedResponseData {
  results: ListTournamentsResponseDataResult[];
}

export interface ListTournamentsResponse extends BackendResponse {
  data: ListTournamentsResponseData;
}

export interface RefreshTokenResponseData {
  access: string;
  lifetime: string;
}

export interface RefreshTokenResponse extends BackendResponse {
  data: RefreshTokenResponseData;
}

export interface ListMatchResponseDataResultPlayer {
  previous_match: number | null;
  name: string | null;
  sets_won: number;
}

export interface ListMatchesResponseDataResult
  extends BackendPaginatedResponseDataResult {
  id: number;
  player1: ListMatchResponseDataResultPlayer;
  player2: ListMatchResponseDataResultPlayer;
  date: string;
  observation: string;
}
export interface ListMatchesResponseData extends BackendPaginatedResponseData {
  results: ListMatchesResponseDataResult[];
}

export interface ListMatchesResponse extends BackendResponse {
  data: ListMatchesResponseData;
}

export interface ListRoundsResponseDataResult
  extends BackendPaginatedResponseDataResult {
  id: number;
  slug: string;
  name: string;
}

export interface ListRoundsResponseData extends BackendPaginatedResponseData {
  results: ListRoundsResponseDataResult[];
}

export interface ListRoundsResponse extends BackendResponse {
  data: ListRoundsResponseData;
}

export type GetPageItems<T> = (
  payload: ListRequestQueryParameters,
  router: AppRouterInstance
) => Promise<T | null>;
