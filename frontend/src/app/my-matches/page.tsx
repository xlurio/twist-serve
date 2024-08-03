'use client';
import MatchInfiniteScrollList from '@/components/matches/MatchInfiniteScrollList';
import {listMatchesForAuthenticatedPlayer} from '@/lib/services/http/matches';
import {Stack} from '@mui/material';

export default function MyMatches(): JSX.Element {
  return (
    <Stack>
      <h1>My Matches</h1>
      <MatchInfiniteScrollList
        getPageItems={listMatchesForAuthenticatedPlayer}
      />
    </Stack>
  );
}
