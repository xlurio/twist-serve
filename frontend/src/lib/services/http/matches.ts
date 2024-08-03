import {getMatches} from '@/lib/adapters';
import {
  ListMatchesQueryParameters,
  ListMatchesResponseData,
} from '@/types/http';
import dayjs from 'dayjs';
import {retrieveAuthenticatedAccount} from './accounts';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {cache} from 'react';

async function listMatches(
  queryParams: ListMatchesQueryParameters
): Promise<ListMatchesResponseData> {
  const response = await getMatches(queryParams);

  return {
    ...response.data.data,
    results: response.data.data.results.map(matchData => ({
      ...matchData,
      date: dayjs(matchData.date).format('MM/DD/YY'),
    })),
  };
}

export const cachedListMatches = cache(listMatches);

export async function listMatchesForAuthenticatedPlayer(
  queryParams: ListMatchesQueryParameters,
  router: AppRouterInstance
) {
  const user = await retrieveAuthenticatedAccount(router);
  const playerId = user?.player || null;

  if (playerId) {
    return await cachedListMatches({
      ...queryParams,
      player: playerId,
    });
  }

  return null;
}
