'use client';
import InfiniteScrollingList from '@/components/list/InfiniteScrollingList';
import TournamentListItem from '@/components/tournaments/TournamentListItem';
import {cachedListTournamentsForAuthenticatedPlayer} from '@/lib/services/http/tournaments';
import { ListTournamentsResponseDataResult } from '@/types/http/tournaments';
import {Stack} from '@mui/material';

export default function MyTournaments(): JSX.Element {
  return (
    <Stack>
      <h1>My Tournaments</h1>
      <InfiniteScrollingList
        mapCallback={(tournamentData: ListTournamentsResponseDataResult) => {
          return (
            <TournamentListItem
              key={tournamentData.id}
              name={tournamentData.name}
              location={`${tournamentData.city}, ${tournamentData.country}`}
              period={`${tournamentData.start_date} - ${tournamentData.end_date}`}
              tournamentAvatar={tournamentData.avatar || undefined}
            />
          );
        }}
        getPageItems={cachedListTournamentsForAuthenticatedPlayer}
        itemVerboseName={'tournament'}
      />
    </Stack>
  );
}
