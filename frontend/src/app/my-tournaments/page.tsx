'use client';
import InfiniteScrollingList from '@/components/list/InfiniteScrollingList';
import TournamentListItem from '@/components/tournaments/TournamentListItem';
import {useCheckIfIsAuthenticatedEffect} from '@/lib/hooks';
import {cachedListTournamentsForAuthenticatedPlayer} from '@/lib/services/http/tournaments';
import {ListTournamentsResponseDataResult} from '@/types/http';
import {Stack} from '@mui/material';
import {useRouter} from 'next/navigation';

export default function MyTournaments(): JSX.Element {
  const [isAuthenticated, _] = useCheckIfIsAuthenticatedEffect();
  const router = useRouter();
  isAuthenticated ? null : router.push('/login/');

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
