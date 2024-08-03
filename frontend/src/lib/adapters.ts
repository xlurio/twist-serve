import {
  CreatePlayerRequest,
  CreatePlayerResponse,
  ListTournamentsQueryParameters,
  ListTournamentsResponse,
  ListMatchesQueryParameters,
  ListMatchesResponse,
  GetAuthenticatedUserResponse,
  GetTokenRequest,
  GetTokenResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ListRoundsQueryParameters,
  ListRoundsResponse,
  RetrieveTournamentResponse,
} from '@/types/http';
import axios, {AxiosResponse} from 'axios';
import Cookies from 'js-cookie';

// token

export function postToken(
  data: GetTokenRequest
): Promise<AxiosResponse<GetTokenResponse>> {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/token/`, data);
}

export function postTokenRefresh(
  data: RefreshTokenRequest
): Promise<AxiosResponse<RefreshTokenResponse>> {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_PATH}/token/refresh/`,
    data
  );
}

// players

export function postPlayers(
  data: CreatePlayerRequest
): Promise<AxiosResponse<CreatePlayerResponse>> {
  return axios.postForm(
    `${process.env.NEXT_PUBLIC_BACKEND_PATH}/players/`,
    data
  );
}

// tournaments

export function getTournaments(
  queryParams: ListTournamentsQueryParameters
): Promise<AxiosResponse<ListTournamentsResponse>> {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/tournaments/`, {
    params: queryParams,
  });
}

export function getTournament(
  tournamentId: number
): Promise<AxiosResponse<RetrieveTournamentResponse>> {
  return axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_PATH}/tournaments/${tournamentId}/`
  );
}

// matches

export function getMatches(
  queryParams: ListMatchesQueryParameters
): Promise<AxiosResponse<ListMatchesResponse>> {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/matches/`, {
    params: queryParams,
  });
}

// accounts

export function getAccountsMe(): Promise<
  AxiosResponse<GetAuthenticatedUserResponse>
> {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/accounts/me/`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
}

// rounds

export function getRounds(
  queryParams: ListRoundsQueryParameters
): Promise<AxiosResponse<ListRoundsResponse>> {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/tournaments/`, {
    params: queryParams,
  });
}
