import dayjs from 'dayjs';

export enum NavigationBarReducerActionType {
  SET_SHOULD_SHOW_PROFILE_MENU = 'SET_SHOULD_SHOW_PROFILE_MENU',
  SET_PROFILE_MENU_ANCHOR_ELEMENT = 'SET_PROFILE_MENU_ANCHOR_ELEMENT',
}

export enum LoginReducerActionTypes {
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_REMEMBER_ME = 'SET_REMEMBER_ME',
  SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE',
}

export enum RegisterReducerActionTypes {
  SET_AVATAR = 'SET_AVATAR',
  SET_BACKHAND = 'SET_BACKHAND',
  SET_BEST_HAND = 'SET_BEST_HAND',
  SET_DATE_OF_BIRTH = 'SET_DATE_OF_BIRTH',
  SET_EMAIL = 'SET_EMAIL',
  SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE',
  SET_FIRST_NAME = 'SET_FIRST_NAME',
  SET_HEIGHT = 'SET_HEIGHT',
  SET_HOMETOWN_CITY = 'SET_HOMETOWN_CITY',
  SET_HOMETOWN_COUNTRY = 'SET_HOMETOWN_COUNTRY',
  SET_HOMETOWN_STATE_PROVINCE = 'SET_HOMETOWN_STATE_PROVINCE',
  SET_LAST_NAME = 'SET_LAST_NAME',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_PASSWORD2 = 'SET_PASSWORD2',
  SET_WEIGHT = 'SET_WEIGHT',
}

export enum InfiniteScrollReducerActionType {
  APPEND = 'APPEND',
  SET_HAS_MORE = 'SET_HAS_MORE',
  SET_IS_FETCHING = 'SET_IS_FETCHING',
  NEXT_PAGE = 'SET_PAGE',
}

export type ReducerActionType =
  | InfiniteScrollReducerActionType
  | LoginReducerActionTypes
  | NavigationBarReducerActionType
  | RegisterReducerActionTypes;

export interface ReducerAction {
  type: ReducerActionType;
}

export interface NavigationBarReducerAction extends ReducerAction {
  type: NavigationBarReducerActionType;
  newProfileMenuAnchorElement?: HTMLElement | null;
  newShouldShowProfileMenu?: boolean;
}

export interface LoginReducerAction extends ReducerAction {
  type: LoginReducerActionTypes;
  newEmail?: string;
  newErrorMessage?: string;
  newPassword?: string;
  newRememberMe?: boolean;
}

export interface RegisterReducerAction extends ReducerAction {
  type: RegisterReducerActionTypes;
  newAvatar?: File;
  newBackhand?: string;
  newBestHand?: string;
  newDateOfBirth?: dayjs.Dayjs | null;
  newEmail?: string;
  newErrorMessage?: string;
  newFirstName?: string;
  newHeight?: string;
  newHometownCity?: string;
  newHometownCountry?: string;
  newHometownStateProvince?: string;
  newLastName?: string;
  newPassword?: string;
  newPassword2?: string;
  newWeight?: string;
}

export interface InfiniteScrollReducerAction<T> extends ReducerAction {
  type: InfiniteScrollReducerActionType;
  itemsToAppend?: T[]
  newHasMore?: boolean;
  newIsFetching?: boolean;
}

export interface ReducerState {}

export interface NavigationBarReducerState extends ReducerState {
  profileMenuAnchorElement: Element | null;
  shouldShowProfileMenu: boolean;
}

export interface LoginReducerState extends ReducerState {
  email: string;
  errorMessage?: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterReducerState extends ReducerState {
  avatar?: File;
  backhand: string;
  bestHand: string;
  dateOfBirth: dayjs.Dayjs | null;
  email: string;
  errorMessage?: string;
  firstName: string;
  height: string;
  hometownCity: string;
  hometownCountry: string;
  hometownStateProvince: string;
  lastName: string;
  password: string;
  password2: string;
  weight: string;
}

export interface InfiniteScrollReducerState<T> extends ReducerState {
  page: number;
  hasMore: boolean;
  items: T[];
  isFetching: boolean;
}
