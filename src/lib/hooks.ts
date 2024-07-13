import {NavigationBarReducerAction, NavigationBarReducerActionType, NavigationBarReducerState} from '@/types';
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useReducer,
  MouseEvent,
  useCallback,
} from 'react';

/**
 * User profile menu state reducer
 * @param prevState previous state of the user profile menu controller
 * @param action dispatched action
 */
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

/**
 * Makes the click event handler for the open profile menu button
 * @param dispatch dispatcher for the state
 *  reducer of the user profile menu controller
 */
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

/**
 * Makes the menu closing event handler
 * @param reducerState state of the user profile menu controller
 * @param dispatch dispatcher for the state reducer of the user profile menu controller
 */
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

/**
 * Makes the logout event handler
 * @param setIsAuthenticated setter for the user authentication state
 * @param handleCloseMenu handler of the menu closing event
 */
function _useHandleLogoutClickCallback(
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
  handleCloseMenu: () => void
): (_event: MouseEvent) => void {
  return useCallback(
    (_event: MouseEvent) => {
      localStorage.removeItem('username');
      setIsAuthenticated(false);
      handleCloseMenu();
    },
    [setIsAuthenticated, handleCloseMenu]
  );
}

/**
 * Makes the handlers used by the user profile menu controller
 * @param dispatch dispatcher for the state reducer of the user profile menu controller
 * @param setIsAuthenticated setter for the user authentication state
 * @param handleCloseMenu handler of the menu closing event
 */
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

/**
 * Hook to handle the state of the user profile menu controller
 * @param setIsAuthenticated setter of the user authentication state
 */
function useProfileState(
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

  return {reducerState, handleProfileClick, handleCloseMenu, handleLogoutClick};
}

export {useProfileState};
