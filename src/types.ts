enum NavigationBarReducerActionType {
  SET_SHOULD_SHOW_PROFILE_MENU = 'SET_SHOULD_SHOW_PROFILE_MENU',
  SET_PROFILE_MENU_ANCHOR_ELEMENT = 'SET_PROFILE_MENU_ANCHOR_ELEMENT',
}

interface NavigationBarReducerState {
  shouldShowProfileMenu: boolean;
  profileMenuAnchorElement: Element | null;
}

interface NavigationBarReducerAction {
  type: NavigationBarReducerActionType;
  newProfileMenuAnchorElement?: HTMLElement | null;
  newShouldShowProfileMenu?: boolean;
}

type Booleanish = boolean | 'true' | 'false';

export {NavigationBarReducerActionType};
export type {NavigationBarReducerState, NavigationBarReducerAction, Booleanish};
