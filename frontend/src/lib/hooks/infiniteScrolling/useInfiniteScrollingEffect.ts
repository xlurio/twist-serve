import {triggerSnackBarOnRequestError} from '@/lib/services/http';
import {CustomThunkDispatch} from '@/types';
import {
  BackendPaginatedResponseDataResult,
  BackendPaginatedResponseData,
  ListRequestQueryParameters,
} from '@/types/http/base';
import {
  InfiniteScrollReducerState,
  InfiniteScrollReducerAction,
  InfiniteScrollReducerActionType,
} from '@/types/reducers';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {Dispatch, useEffect, MutableRefObject} from 'react';
import {useInfiniteScrollingObserverEffect} from '..';

interface UseFetchEffectParams<
  T extends BackendPaginatedResponseDataResult,
  K extends BackendPaginatedResponseData,
> {
  infiniteScrollState: InfiniteScrollReducerState<T>;
  infiniteScrollDispatch: Dispatch<InfiniteScrollReducerAction<T>>;
  storeDispatch: CustomThunkDispatch;
  router: AppRouterInstance;
  getPageItems: (
    payload: ListRequestQueryParameters,
    router: AppRouterInstance
  ) => Promise<K | null>;
}

function _useFetchItemsCallback<
  T extends BackendPaginatedResponseDataResult,
  K extends BackendPaginatedResponseData,
>(data: UseFetchEffectParams<T, K>) {
  const {page} = data.infiniteScrollState;
  return async () => {
    const itemsData = await data.getPageItems({page: page}, data.router);
    await _setItemsIfUserWasFound({
      itemsData,
      infiniteScrollDispatch: data.infiniteScrollDispatch,
    });
    data.infiniteScrollDispatch({
      type: InfiniteScrollReducerActionType.SET_IS_FETCHING,
      newIsFetching: false,
    });
  };
}
function _useFetchItemsOrSnackBarCallback<
  T extends BackendPaginatedResponseDataResult,
  K extends BackendPaginatedResponseData,
>(data: UseFetchEffectParams<T, K>) {
  return async () => {
    await triggerSnackBarOnRequestError(
      _useFetchItemsCallback(data),
      data.storeDispatch
    );
  };
}

async function _setItemsIfUserWasFound<
  T extends BackendPaginatedResponseData,
  K extends BackendPaginatedResponseDataResult,
>({
  itemsData,
  infiniteScrollDispatch,
}: {
  itemsData: T | null;
  infiniteScrollDispatch: Dispatch<InfiniteScrollReducerAction<K>>;
}) {
  if (itemsData) {
    infiniteScrollDispatch({
      type: InfiniteScrollReducerActionType.APPEND,
      itemsToAppend: itemsData.results as K[],
    });
    infiniteScrollDispatch({
      type: InfiniteScrollReducerActionType.SET_HAS_MORE,
      newHasMore: itemsData.next !== null,
    });
  }
}
function _fetchIn100<
  T extends BackendPaginatedResponseDataResult,
  K extends BackendPaginatedResponseData,
>(data: UseFetchEffectParams<T, K>) {
  data.infiniteScrollDispatch({
    type: InfiniteScrollReducerActionType.SET_IS_FETCHING,
    newIsFetching: true,
  });
  const timeout = setTimeout(
    _useFetchItemsOrSnackBarCallback({
      infiniteScrollState: data.infiniteScrollState,
      infiniteScrollDispatch: data.infiniteScrollDispatch,
      storeDispatch: data.storeDispatch,
      router: data.router,
      getPageItems: data.getPageItems,
    }),
    100
  );
  return () => clearTimeout(timeout);
}

function _useFetchEffect<
  T extends BackendPaginatedResponseDataResult,
  K extends BackendPaginatedResponseData,
>(data: UseFetchEffectParams<T, K>) {
  const {page, hasMore} = data.infiniteScrollState;

  useEffect(() => {
    if (hasMore) {
      return _fetchIn100({
        infiniteScrollState: data.infiniteScrollState,
        infiniteScrollDispatch: data.infiniteScrollDispatch,
        storeDispatch: data.storeDispatch,
        router: data.router,
        getPageItems: data.getPageItems,
      });
    }
  }, [page]);
}

export function useInfiniteScrollingEffect<
  T extends BackendPaginatedResponseDataResult,
  K extends BackendPaginatedResponseData,
>(data: {
  infiniteScrollState: InfiniteScrollReducerState<T>;
  infiniteScrollDispatch: Dispatch<InfiniteScrollReducerAction<T>>;
  loadingRef: MutableRefObject<HTMLLIElement | null>;
  storeDispatch: CustomThunkDispatch;
  router: AppRouterInstance;
  getPageItems: (
    payload: ListRequestQueryParameters,
    router: AppRouterInstance
  ) => Promise<K | null>;
}) {
  useInfiniteScrollingObserverEffect({
    infiniteScrollState: data.infiniteScrollState,
    infiniteScrollDispatch: data.infiniteScrollDispatch,
    loadingRef: data.loadingRef,
  });
  _useFetchEffect({
    infiniteScrollState: data.infiniteScrollState,
    infiniteScrollDispatch: data.infiniteScrollDispatch,
    storeDispatch: data.storeDispatch,
    router: data.router,
    getPageItems: data.getPageItems,
  });
}
