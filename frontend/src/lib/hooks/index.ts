import {Dispatch, MutableRefObject, SetStateAction, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {AppDispatch, AppStore, RootState} from '../store';
import {
  InfiniteScrollReducerAction,
  InfiniteScrollReducerActionType,
  InfiniteScrollReducerState,
} from '@/types/reducers';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export function useCheckIfIsAuthenticatedEffect(): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
] {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isTokenCookieSet = Boolean(Cookies.get('token'));
    setIsAuthenticated(isTokenCookieSet);
  }, []);

  return [isAuthenticated, setIsAuthenticated];
}

export function useInfiniteScrollingObserverEffect<T>({
  infiniteScrollState,
  infiniteScrollDispatch,
  loadingRef,
}: {
  infiniteScrollState: InfiniteScrollReducerState<T>;
  infiniteScrollDispatch: Dispatch<
    InfiniteScrollReducerAction<T>
  >;
  loadingRef: MutableRefObject<HTMLLIElement | null>;
}) {
  useEffect(() => {
    if (loadingRef.current) {
      _setupObserver({
        infiniteScrollState,
        infiniteScrollDispatch,
        loadingRef: loadingRef as MutableRefObject<HTMLLIElement>,
      });
    }
  }, [loadingRef.current, infiniteScrollState.isFetching]);
}

function _setupObserver<T>({
  infiniteScrollState,
  infiniteScrollDispatch,
  loadingRef,
}: {
  infiniteScrollState: InfiniteScrollReducerState<T>;
  infiniteScrollDispatch: Dispatch<
    InfiniteScrollReducerAction<T>
  >;
  loadingRef: MutableRefObject<HTMLLIElement>;
}) {
  const observer = new IntersectionObserver(entries => {
    if (
      entries[0].isIntersecting &&
      infiniteScrollState.hasMore &&
      !infiniteScrollState.isFetching
    ) {
      infiniteScrollDispatch({
        type: InfiniteScrollReducerActionType.NEXT_PAGE,
      });
      observer.disconnect();
    }
  });

  observer.observe(loadingRef.current);
}
