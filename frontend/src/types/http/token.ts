import {BackendResponse} from './base';

export enum UserRole {
  PLAYER = 'player',
  STAFF = 'staff',
}

export interface GetTokenRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface GetTokenResponse extends BackendResponse {
  data: {
    refresh: string;
    access: string;
    lifetime: string;
    role: UserRole;
  };
}

export interface RefreshTokenResponseData {
  access: string;
  lifetime: string;
}

export interface RefreshTokenResponse extends BackendResponse {
  data: RefreshTokenResponseData;
}
