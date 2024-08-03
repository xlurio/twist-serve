'use client'
import {
  GetPageItems,
} from '@/types/http/base';
import InfiniteScrollingList from '../list/InfiniteScrollingList';
import MatchListItem from './matchList/MatchListItem';
import { ListMatchesResponseData, ListMatchesResponseDataResult } from '@/types/http/matches';

export default function MatchInfiniteScrollList({
  getPageItems,
}: {
  getPageItems: GetPageItems<ListMatchesResponseData>;
}): JSX.Element {
  return (
    <InfiniteScrollingList
      mapCallback={(matchData: ListMatchesResponseDataResult) => {
        return (
          <MatchListItem
            key={matchData.id}
            player1={matchData.player1}
            player2={matchData.player2}
            date={matchData.date}
          />
        );
      }}
      getPageItems={getPageItems}
      itemVerboseName={'match'}
    />
  );
}
