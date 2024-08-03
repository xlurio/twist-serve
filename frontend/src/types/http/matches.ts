import { ListRequestQueryParameters, BackendPaginatedResponseDataResult, BackendPaginatedResponseData, BackendResponse } from "./base";


export interface ListMatchesQueryParameters extends ListRequestQueryParameters {
  player?: number;
  match_round?: number;
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
