import {fetchMatches} from '@/lib/adapters';
import {
  ListMatchesQueryParameters,
  ListMatchesResponseData,
} from '@/types/http';
import dayjs from 'dayjs';
import {myAccountData} from './accounts';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';

export async function listMatches(
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

export async function listMatchesForAuthenticatedPlayer(
  queryParams: ListMatchesQueryParameters,
  router: AppRouterInstance
) {
  const user = await myAccountData(router);
  const playerId = user ? user.player : null;

  if (playerId) {
    return await listMatches({
      ...queryParams,
      player: playerId,
    });
  }

  return null;
}
