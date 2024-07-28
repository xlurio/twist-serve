import {
  CreatePlayerRequest,
  CreatePlayerResponse,
  GetTokenRequest,
  GetTokenResponse,
} from '@/types';
import axios, {AxiosResponse} from 'axios';

export function getToken(
  data: GetTokenRequest
): Promise<AxiosResponse<GetTokenResponse>> {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/token/`, data);
}

export function createPlayer(
  data: CreatePlayerRequest
): Promise<AxiosResponse<CreatePlayerResponse>> {
  return axios.postForm(
    `${process.env.NEXT_PUBLIC_BACKEND_PATH}/players/`,
    data
  );
}
