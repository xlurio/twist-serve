import {
  NavigationBarReducerAction,
  NavigationBarReducerActionType,
  NavigationBarReducerState,
} from '@/types';
import {
  Dispatch,
  SetStateAction,
  useReducer,
  MouseEvent,
  useCallback,
  MouseEventHandler,
} from 'react';
import 'dayjs/locale/en';
import Cookies from 'js-cookie';

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

function _useHandleLogoutClickCallback(
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
  handleCloseMenu: () => void
): (_event: MouseEvent) => void {
  return useCallback(
    (_event: MouseEvent) => {
      Cookies.remove('token');
      setIsAuthenticated(false);
      handleCloseMenu();
    },
    [setIsAuthenticated, handleCloseMenu]
  );
}

function _makeHandlers(
  dispatch: Dispatch<NavigationBarReducerAction>,
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
  handleCloseMenu: () => void
): {
  handleProfileClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleLogoutClick: (_event: MouseEvent) => void;
} {
  return {
    handleProfileClick: _useHandleProfileClickCallback(dispatch),
    handleLogoutClick: _useHandleLogoutClickCallback(
      setIsAuthenticated,
      handleCloseMenu
    ),
  };
}

export function useProfileState(
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
): {
  reducerState: NavigationBarReducerState;
  handleProfileClick: MouseEventHandler<HTMLButtonElement>;
  handleCloseMenu: () => void;
  handleLogoutClick: MouseEventHandler<HTMLLIElement>;
} {
  const [reducerState, dispatch] = useReducer(_profileMenuReducer, {
    shouldShowProfileMenu: false,
    profileMenuAnchorElement: null,
  });

  const handleCloseMenu = _useHandleCloseMenuCallback(reducerState, dispatch);

  const {
    handleProfileClick,
    handleLogoutClick,
  }: {
    handleProfileClick: MouseEventHandler<HTMLButtonElement>;
    handleLogoutClick: MouseEventHandler<HTMLLIElement>;
  } = _makeHandlers(dispatch, setIsAuthenticated, handleCloseMenu);

  return {
    reducerState,
    handleProfileClick,
    handleCloseMenu,
    handleLogoutClick,
  };
}
