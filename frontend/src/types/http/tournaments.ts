import {
  ListRequestQueryParameters,
  BackendPaginatedResponseDataResult,
  BackendPaginatedResponseData,
  BackendResponse,
} from './base';

export type CourtSurface = 'clay' | 'grass' | 'hard';

export interface ListTournamentsQueryParameters
  extends ListRequestQueryParameters {
  ordering?: 'num_of_subscriptions' | '-num_of_subscriptions';
  start_date__gte?: string;
  subscriptions__player__in?: number;
}

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

export interface ListTournamentsResponseData
  extends BackendPaginatedResponseData {
  results: ListTournamentsResponseDataResult[];
}

export interface ListTournamentsResponse extends BackendResponse {
  data: ListTournamentsResponseData;
}

export interface CreateTournamentRequest {
  name: string;
  avatar: File | null;
  country: string;
  state_province: string;
  city: string;
  neighborhood: string;
  street: string;
  building_number: number;
  complement: string;
  instalation: string;
  start_date: string;
  end_date: string;
  surface: CourtSurface;
  slots: number;
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

export interface CreateTournamentResponseData {
  id: number;
  name: string;
  avatar: string | null;
  country: string;
  state_province: string;
  city: string;
  neighborhood: string;
  street: string;
  building_number: number;
  complement: string;
  instalation: string;
  start_date: string;
  end_date: string;
  surface: 'clay' | 'grass' | 'hard';
  slots: number;
}

export interface CreateTournamentResponse extends BackendResponse {
  data: CreateTournamentResponseData;
}
