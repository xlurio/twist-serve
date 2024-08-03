'use client';
import InfiniteScrollingLoading from './infiniteScrollingList/InfiniteScrollingLoading';
import {useInfiniteScrollingState} from '@/lib/hooks/infiniteScrolling';
import {
  BackendPaginatedResponseData,
  BackendPaginatedResponseDataResult,
  GetPageItems,
} from '@/types/http/base';
import {List} from '@mui/material';
import InfiniteScrollingNotFound from './infiniteScrollingList/InfiniteScrollingNotFound';

export default function InfiniteScrollingList<
  T extends BackendPaginatedResponseDataResult,
  K extends BackendPaginatedResponseData,
>(props: {
  mapCallback: (value: T) => JSX.Element;
  getPageItems: GetPageItems<K>;
  itemVerboseName: string;
}) {
  const [infiniteScrollState, loadingRef] = useInfiniteScrollingState(
    props.getPageItems
  );
  const noItemsWereFound = infiniteScrollState.items.length <= 0;

  return (
    <List>
      <InfiniteScrollingNotFound
        hasNoMore={!infiniteScrollState.hasMore}
        noItemsWereFound={noItemsWereFound}
        itemVerboseName={props.itemVerboseName}
      />
      {(infiniteScrollState.items as T[]).map(props.mapCallback)}
      <InfiniteScrollingLoading
        hasMore={infiniteScrollState.hasMore}
        ref={loadingRef}
      />
    </List>
  );
}
