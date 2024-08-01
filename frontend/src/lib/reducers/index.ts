import {checkForActionValue, executeReducerAction} from '@/lib/services';
import {ActionTypeUnrecognized} from '@/lib/errors';
import {
  InfiniteScrollReducerState,
  InfiniteScrollReducerAction,
  InfiniteScrollReducerActionType,
} from '@/types/reducers';

export function infiniteScrollReducer<T>(
  state: InfiniteScrollReducerState<T>,
  action: InfiniteScrollReducerAction<T>
) {
  switch (action.type) {
    case InfiniteScrollReducerActionType.APPEND:
      checkForActionValue({action, actionAttrName: 'itemsToAppend'});
      return {
        ...state,
        items: state.items.concat(action.itemsToAppend as T[]),
      };
    case InfiniteScrollReducerActionType.SET_HAS_MORE:
      return executeReducerAction({
        state,
        stateAttrName: 'hasMore',
        action,
        actionAttrName: 'newHasMore',
      });
    case InfiniteScrollReducerActionType.SET_IS_FETCHING:
      return executeReducerAction({
        state,
        stateAttrName: 'isFetching',
        action,
        actionAttrName: 'newIsFetching',
      });
    default:
      return _infiniteScrollReducerForNextPage(state, action);
  }
}

function _infiniteScrollReducerForNextPage<T>(
  state: InfiniteScrollReducerState<T>,
  action: InfiniteScrollReducerAction<T>
) {
  const doNextPage = action.type === InfiniteScrollReducerActionType.NEXT_PAGE;

  if (doNextPage) {
    return {
      ...state,
      page: state.page + 1,
    };
  }

  throw new ActionTypeUnrecognized(`${action.type} action type unrecognized`);
}
