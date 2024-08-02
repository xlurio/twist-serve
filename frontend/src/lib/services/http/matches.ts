import {fetchMatches} from '@/lib/adapters';
import {
  ListMatchesQueryParameters,
  ListMatchesResponseData,
} from '@/types/http';
import dayjs from 'dayjs';
import {myAccountData} from './accounts';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {cache} from 'react';

async function _listMatches(
  queryParams: ListMatchesQueryParameters
): Promise<ListMatchesResponseData> {
  const response = await fetchMatches(queryParams);

  return {
    ...response.data.data,
    results: response.data.data.results.map(matchData => ({
      ...matchData,
      date: dayjs(matchData.date).format('MM/DD/YY'),
    })),
  };
}

export const cachedListMatches = cache(_listMatches);

export async function listMatchesForAuthenticatedPlayer(
  queryParams: ListMatchesQueryParameters,
  router: AppRouterInstance
) {
  const user = await myAccountData(router);
  const playerId = user ? user.player : null;

  if (playerId) {
    return await cachedListMatches({
      ...queryParams,
      player: playerId,
    });
  }

  return null;
}
