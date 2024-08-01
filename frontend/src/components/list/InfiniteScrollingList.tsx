import InfiniteScrollingLoading from '@/components/list/InfiniteScrollingLoading';
import {useInfiniteScrollingState} from '@/lib/hooks/infiniteScrolling';
import {
  BackendPaginatedResponseData,
  BackendPaginatedResponseDataResult,
  ListRequestQueryParameters,
} from '@/types/http';
import {List} from '@mui/material';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function InfiniteScrollingList<
  T extends BackendPaginatedResponseDataResult,
  K extends BackendPaginatedResponseData,
>({
  mapCallback,
  getPageItems,
  itemVerboseName,
}: {
  mapCallback: (value: T) => JSX.Element;
  getPageItems: (
    payload: ListRequestQueryParameters,
    router: AppRouterInstance
  ) => Promise<K | null>;
  itemVerboseName: string;
}) {
  const [infiniteScrollState, loadingRef] =
    useInfiniteScrollingState(getPageItems);
  const itemsWereFound = infiniteScrollState.items.length > 0;

  return (
    <List>
      {itemsWereFound ? '' : <h2>No {itemVerboseName} was found</h2>}
      {(infiniteScrollState.items as T[]).map(mapCallback)}
      <InfiniteScrollingLoading
        hasMore={infiniteScrollState.hasMore}
        ref={loadingRef}
      />
    </List>
  );
}
