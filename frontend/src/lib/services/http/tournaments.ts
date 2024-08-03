import {postTournaments, getTournaments, getTournament} from '@/lib/adapters';
import {
  CreateTournamentRequest,
  CreateTournamentResponseData,
  ListTournamentsQueryParameters,
  ListTournamentsResponseData,
} from '@/types/http/tournaments';
import dayjs from 'dayjs';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {cache} from 'react';
import {retrieveAuthenticatedAccount} from './accounts';
import {refreshOrLogoutServerSide} from './refreshOrLogoutServerSide';

export async function createTournament(
  data: CreateTournamentRequest
): Promise<CreateTournamentResponseData | null> {
  const response = await refreshOrLogoutServerSide(() => {
    return postTournaments(data);
  });

  return response?.data.data || null;
}

async function listTournaments(
  queryParams: ListTournamentsQueryParameters
): Promise<ListTournamentsResponseData> {
  const response = await getTournaments(queryParams);

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
  const user = await retrieveAuthenticatedAccount(router);
  const playerId = user?.player || null;

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

async function retrieveTournament(tournamentId: number) {
  const response = await getTournament(tournamentId);

  return {
    ...response.data.data,
    start_date: dayjs(response.data.data.start_date).format('D MMMM, YYYY'),
    end_date: dayjs(response.data.data.end_date).format('D MMMM, YYYY'),
  };
}

export const cachedRetrieveTournament = cache(retrieveTournament);
