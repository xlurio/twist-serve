import {fetchTournaments} from '@/lib/adapters';
import {
  ListTournamentsQueryParameters,
  ListTournamentsResponseData,
} from '@/types/http';
import dayjs from 'dayjs';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {myAccountData} from './accounts';
import {cache} from 'react';

async function listTournaments(
  queryParams: ListTournamentsQueryParameters
): Promise<ListTournamentsResponseData> {
  const response = await fetchTournaments(queryParams);

  return {
    ...response.data.data,
    results: response.data.data.results.map(tournamentData => ({
      ...tournamentData,
      start_date: dayjs(tournamentData.start_date).format('D MMMM, YYYY'),
      end_date: dayjs(tournamentData.end_date).format('D MMMM, YYYY'),
    })),
  };
}

export const cachedListTournaments = cache(listTournaments);

async function _listTournamentsForAuthenticatedPlayer(
  queryParams: ListTournamentsQueryParameters,
  router: AppRouterInstance
): Promise<ListTournamentsResponseData | null> {
  const user = await myAccountData(router);
  const playerId = user ? user.player : null;

  if (playerId) {
    return await cachedListTournaments({
      ...queryParams,
      subscriptions__player__in: playerId,
    });
  }

  return null;
}

export const cachedListTournamentsForAuthenticatedPlayer = cache(
  _listTournamentsForAuthenticatedPlayer
);
