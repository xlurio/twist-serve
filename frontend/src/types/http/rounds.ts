import { ListRequestQueryParameters, BackendPaginatedResponseDataResult, BackendPaginatedResponseData, BackendResponse } from "./base";


export interface ListRoundsQueryParameters extends ListRequestQueryParameters {
  tournament?: number;
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
