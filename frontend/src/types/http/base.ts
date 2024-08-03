import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface BackendResponse {
  status: BackendResponseStatuses;
  message?: string;
  data?: object;
}

export enum BackendResponseStatuses {
  SUCCESS = 'success',
  FAIL = 'fail',
  ERROR = 'error',
}

export interface BackendPaginatedResponseData {
  count: number;
  next: string | null;
  previous: string | null;
  results: BackendPaginatedResponseDataResult[];
}

export interface BackendPaginatedResponseDataResult {}

export interface ListRequestQueryParameters {
  page?: number;
  page_size?: number;
}

export type GetPageItems<T> = (
  payload: ListRequestQueryParameters,
  router: AppRouterInstance
) => Promise<T | null>;
