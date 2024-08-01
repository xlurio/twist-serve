import {useAppDispatch} from '@/lib/hooks';
import {infiniteScrollReducer} from '@/lib/reducers';
import {
  BackendPaginatedResponseData,
  BackendPaginatedResponseDataResult,
  ListRequestQueryParameters,
} from '@/types/http';
import {InfiniteScrollReducerState} from '@/types/reducers';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {useRouter} from 'next/navigation';
import {MutableRefObject, useReducer, useRef} from 'react';
import {useInfiniteScrollingEffect} from './useInfiniteScrollingEffect';

function _makeInfiniteScrollingInitialState() {
  return {
    page: 1,
    hasMore: true,
    items: [],
    isFetching: true,
  };
}

export function useInfiniteScrollingState<
  T extends BackendPaginatedResponseDataResult,
  K extends BackendPaginatedResponseData,
>(
  getPageItems: (
    payload: ListRequestQueryParameters,
    router: AppRouterInstance
  ) => Promise<K | null>
): [InfiniteScrollReducerState<T>, MutableRefObject<HTMLLIElement | null>] {
  const router = useRouter();
  const storeDispatch = useAppDispatch();
  const [infiniteScrollState, infiniteScrollDispatch] = useReducer<
    typeof infiniteScrollReducer<T>
  >(infiniteScrollReducer, _makeInfiniteScrollingInitialState());
  const loadingRef = useRef<HTMLLIElement | null>(null);

  useInfiniteScrollingEffect({
    infiniteScrollState,
    infiniteScrollDispatch,
    loadingRef,
    storeDispatch,
    router,
    getPageItems,
  });

  return [infiniteScrollState, loadingRef];
}
