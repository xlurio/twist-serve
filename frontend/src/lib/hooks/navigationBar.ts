'use client';
import {
  Dispatch,
  useReducer,
  MouseEvent,
  useCallback,
  MouseEventHandler,
} from 'react';

import Cookies from 'js-cookie';
import {
  NavigationBarReducerAction,
  NavigationBarReducerActionType,
  NavigationBarReducerState,
} from '@/types/reducers';
import {useRouter} from 'next/navigation';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';

function _profileMenuReducer(
  prevState: NavigationBarReducerState,
  action: NavigationBarReducerAction
): NavigationBarReducerState {
  switch (action.type) {
    case NavigationBarReducerActionType.SET_SHOULD_SHOW_PROFILE_MENU:
      return {
        ...prevState,
        shouldShowProfileMenu:
          action.newShouldShowProfileMenu || !prevState.shouldShowProfileMenu,
      };
    case NavigationBarReducerActionType.SET_PROFILE_MENU_ANCHOR_ELEMENT:
      return {
        ...prevState,
        profileMenuAnchorElement: action.newProfileMenuAnchorElement || null,
      };
    default:
      return prevState;
  }
}

function _useHandleProfileClickCallback(
  dispatch: Dispatch<NavigationBarReducerAction>
): (event: MouseEvent<HTMLButtonElement>) => void {
  return useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      dispatch({
        type: NavigationBarReducerActionType.SET_PROFILE_MENU_ANCHOR_ELEMENT,
        newProfileMenuAnchorElement: event.target as HTMLElement,
      });
      dispatch({
        type: NavigationBarReducerActionType.SET_SHOULD_SHOW_PROFILE_MENU,
        newShouldShowProfileMenu: true,
      });
    },
    [dispatch]
  );
}

function _useHandleCloseMenuCallback(
  reducerState: NavigationBarReducerState,
  dispatch: Dispatch<NavigationBarReducerAction>
): () => void {
  return useCallback(() => {
    if (reducerState.shouldShowProfileMenu) {
      dispatch({
        type: NavigationBarReducerActionType.SET_PROFILE_MENU_ANCHOR_ELEMENT,
        newProfileMenuAnchorElement: null,
      });
      dispatch({
        type: NavigationBarReducerActionType.SET_SHOULD_SHOW_PROFILE_MENU,
        newShouldShowProfileMenu: false,
      });
    }
  }, [reducerState, dispatch]);
}

function _useHandleLogoutClickCallback({
  handleCloseMenu,
  router,
}: {
  handleCloseMenu: () => void;
  router: AppRouterInstance;
}): (_event: MouseEvent) => void {
  return useCallback(
    (_event: MouseEvent) => {
      Cookies.remove('token');
      router.refresh();
      handleCloseMenu();
    },
    [handleCloseMenu, router]
  );
}

function _makeHandlers({
  dispatch,
  handleCloseMenu,
  router,
}: {
  dispatch: Dispatch<NavigationBarReducerAction>;
  handleCloseMenu: () => void;
  router: AppRouterInstance;
}): {
  handleProfileClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleLogoutClick: (_event: MouseEvent) => void;
} {
  return {
    handleProfileClick: _useHandleProfileClickCallback(dispatch),
    handleLogoutClick: _useHandleLogoutClickCallback({
      handleCloseMenu,
      router,
    }),
  };
}

export function useProfileState(): {
  reducerState: NavigationBarReducerState;
  handleProfileClick: MouseEventHandler<HTMLButtonElement>;
  handleCloseMenu: () => void;
  handleLogoutClick: MouseEventHandler<HTMLLIElement>;
} {
  const router = useRouter();
  const [reducerState, dispatch] = useReducer(_profileMenuReducer, {
    shouldShowProfileMenu: false,
    profileMenuAnchorElement: null,
  });

  const handleCloseMenu = _useHandleCloseMenuCallback(reducerState, dispatch);

  const handlers = _makeHandlers({
    dispatch,
    handleCloseMenu,
    router,
  });

  return {
    reducerState,
    handleProfileClick: handlers.handleProfileClick,
    handleCloseMenu,
    handleLogoutClick: handlers.handleLogoutClick,
  };
}
