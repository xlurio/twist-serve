import {GetAuthenticatedUserResponse} from '@/types/http/accounts';
import {
  ListMatchesQueryParameters,
  ListMatchesResponse,
} from '@/types/http/matches';
import {CreatePlayerRequest, CreatePlayerResponse} from '@/types/http/players';
import {
  ListRoundsQueryParameters,
  ListRoundsResponse,
} from '@/types/http/rounds';
import {
  GetTokenRequest,
  GetTokenResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@/types/http/token';
import {
  CreateTournamentRequest,
  CreateTournamentResponse,
  ListTournamentsQueryParameters,
  ListTournamentsResponse,
  RetrieveTournamentResponse,
} from '@/types/http/tournaments';
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

export function postTournaments(
  data: CreateTournamentRequest
): Promise<AxiosResponse<CreateTournamentResponse>> {
  return axios.postForm(
    `${process.env.NEXT_PUBLIC_BACKEND_PATH}/tournaments/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }
  );
}

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
