'use client';
import InfiniteScrollingList from '@/components/list/InfiniteScrollingList';
import MatchListItem from '@/components/matches/MatchListItem';
import {useCheckIfIsAuthenticatedEffect} from '@/lib/hooks';
import {listMatchesForAuthenticatedPlayer} from '@/lib/services/http/matches';
import {ListMatchesResponseDataResult} from '@/types/http';
import {Stack} from '@mui/material';
import {useRouter} from 'next/navigation';

export default function MyMatches(): JSX.Element {
  const [isAuthenticated, _] = useCheckIfIsAuthenticatedEffect();
  const router = useRouter();
  isAuthenticated ? null : router.push('/login/');

  return (
    <Stack>
      <h1>My Matches</h1>
      <InfiniteScrollingList
        mapCallback={(matchData: ListMatchesResponseDataResult) => {
          return (
            <MatchListItem
              key={matchData.id}
              player1={matchData.player1.name}
              player1Score={matchData.player1.sets_won}
              player2Score={matchData.player2.sets_won}
              player2={matchData.player2.name}
              date={matchData.date}
            />
          );
        }}
        getPageItems={listMatchesForAuthenticatedPlayer}
        itemVerboseName={'match'}
      />
    </Stack>
  );
}
