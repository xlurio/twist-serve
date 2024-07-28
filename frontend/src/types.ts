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
  SET_EMAIL = 'SET_EMAIL',
  SET_FIRST_NAME = 'SET_FIRST_NAME',
  SET_LAST_NAME = 'SET_LAST_NAME',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_PASSWORD2 = 'SET_PASSWORD2',
  SET_DATE_OF_BIRTH = 'SET_DATE_OF_BIRTH',
  SET_HOMETOWN_COUNTRY = 'SET_HOMETOWN_COUNTRY',
  SET_HOMETOWN_STATE_PROVINCE = 'SET_HOMETOWN_STATE_PROVINCE',
  SET_HOMETOWN_CITY = 'SET_HOMETOWN_CITY',
  SET_WEIGHT = 'SET_WEIGHT',
  SET_HEIGHT = 'SET_HEIGHT',
  SET_BEST_HAND = 'SET_BEST_HAND',
  SET_BACKHAND = 'SET_BACKHAND',
  SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE',
}

export type ReducerActionType =
  | NavigationBarReducerActionType
  | LoginReducerActionTypes
  | RegisterReducerActionTypes;

export interface ReducerAction {
  type: ReducerActionType;
}

export interface NavigationBarReducerAction {
  type: NavigationBarReducerActionType;
  newProfileMenuAnchorElement?: HTMLElement | null;
  newShouldShowProfileMenu?: boolean;
}

export interface LoginReducerAction {
  type: LoginReducerActionTypes;
  newEmail?: string;
  newPassword?: string;
  newRememberMe?: boolean;
  newErrorMessage?: string;
}

export interface RegisterReducerAction {
  type: RegisterReducerActionTypes;
  newAvatar?: File;
  newEmail?: string;
  newFirstName?: string;
  newLastName?: string;
  newPassword?: string;
  newPassword2?: string;
  newDateOfBirth?: dayjs.Dayjs | null;
  newHometownCountry?: string;
  newHometownStateProvince?: string;
  newHometownCity?: string;
  newWeight?: string;
  newHeight?: string;
  newBestHand?: string;
  newBackhand?: string;
  newErrorMessage?: string;
}

export interface ReducerState {}

export interface NavigationBarReducerState extends ReducerState {
  shouldShowProfileMenu: boolean;
  profileMenuAnchorElement: Element | null;
}

export interface LoginReducerState extends ReducerState {
  email: string;
  password: string;
  rememberMe: boolean;
  errorMessage?: string;
}

export interface RegisterReducerState extends ReducerState {
  avatar?: File;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  password2: string;
  dateOfBirth: dayjs.Dayjs | null;
  hometownCountry: string;
  hometownStateProvince: string;
  hometownCity: string;
  weight: string;
  height: string;
  bestHand: string;
  backhand: string;
  errorMessage?: string;
}

export enum BackendResponseStatuses {
  SUCCESS = 'success',
  FAIL = 'fail',
  ERROR = 'error',
}

export interface BackendResponse {
  status: BackendResponseStatuses;
  message?: string;
  data?: object;
}

export interface GetTokenRequest {
  email: string;
  password: string;
}

export interface CreatePlayerRequest {
  avatar: File | null;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  date_of_birth: string;
  hometown_country: string;
  hometown_state_province: string;
  hometown_city: string;
  weight: string;
  height: string;
  best_hand: string;
  backhand: string;
}

export interface GetTokenResponse extends BackendResponse {
  data: {
    refresh: string;
    access: string;
    lifetime: string;
  };
}

export interface CreatePlayerResponse extends BackendResponse {
  data: {
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
    date_of_birth: dayjs.Dayjs;
    hometown_country: string;
    hometown_state_province: string;
    hometown_city: string;
    weight: string;
    height: string;
    best_hand: string;
    backhand: string;
  };
}

export type Booleanish = boolean | 'true' | 'false';
