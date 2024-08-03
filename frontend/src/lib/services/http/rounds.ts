import { getRounds } from "@/lib/adapters";
import { ListRoundsQueryParameters } from "@/types/http/rounds";
import { cache } from "react";


function _listRounds(queryParams: ListRoundsQueryParameters) {
  return getRounds(queryParams);
}

export const cachedListRounds = cache(_listRounds);
