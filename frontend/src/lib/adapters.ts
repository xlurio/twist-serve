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
} from '@/types/http';
import axios, {AxiosResponse} from 'axios';
import Cookies from 'js-cookie';

export function createPlayer(
  data: CreatePlayerRequest
): Promise<AxiosResponse<CreatePlayerResponse>> {
  console.log('data: %s', data);
  return axios.postForm(
    `${process.env.NEXT_PUBLIC_BACKEND_PATH}/players/`,
    data
  );
}

export function fetchTournaments(
  queryParams: ListTournamentsQueryParameters
): Promise<AxiosResponse<ListTournamentsResponse>> {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/tournaments/`, {
    params: queryParams,
  });
}

export function fetchMatches(
  queryParams: ListMatchesQueryParameters
): Promise<AxiosResponse<ListMatchesResponse>> {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/matches/`, {
    params: queryParams,
  });
}

export function getAuthenticatedUser(): Promise<
  AxiosResponse<GetAuthenticatedUserResponse>
> {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/accounts/me/`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
}

export function getToken(
  data: GetTokenRequest
): Promise<AxiosResponse<GetTokenResponse>> {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/token/`, data);
}

export function refreshAccessToken(
  data: RefreshTokenRequest
): Promise<AxiosResponse<RefreshTokenResponse>> {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_PATH}/token/refresh/`,
    data
  );
}
