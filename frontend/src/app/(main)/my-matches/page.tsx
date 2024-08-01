'use client';
import InfiniteScrollingList from '@/components/list/InfiniteScrollingList';
import MatchListItem from '@/components/matches/MatchListItem';
import {listMatchesForAuthenticatedPlayer} from '@/lib/services/http/matches';
import {ListMatchesResponseDataResult} from '@/types/http';
import {Stack} from '@mui/material';

export default function MyMatches(): JSX.Element {
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
        itemVerboseName={''}
      />
    </Stack>
  );
}
