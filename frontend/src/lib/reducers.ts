import {
  RegisterReducerAction,
  RegisterReducerActionTypes,
  RegisterReducerState,
} from '@/types';
import 'dayjs/locale/en';
import {executeReducerAction} from '@/lib/services';
import {ActionTypeUnrecognized} from '@/lib/errors';

export function registerStateReducer(
  state: RegisterReducerState,
  action: RegisterReducerAction
): RegisterReducerState {
  const doSetErrorMessage =
    action.type === RegisterReducerActionTypes.SET_ERROR_MESSAGE;

  if (doSetErrorMessage) {
    return {
      ...state,
      errorMessage: action.newErrorMessage,
    };
  }

  return _registerStateReducerForCredentials(state, action);
}

function _registerStateReducerForCredentials(
  state: RegisterReducerState,
  action: RegisterReducerAction
): RegisterReducerState {
  switch (action.type) {
    case RegisterReducerActionTypes.SET_EMAIL:
      return executeReducerAction({
        state,
        stateAttrName: 'email',
        action,
        actionAttrName: 'newEmail',
      });
    case RegisterReducerActionTypes.SET_PASSWORD:
      return executeReducerAction({
        state,
        stateAttrName: 'password',
        action,
        actionAttrName: 'newPassword',
      });
    case RegisterReducerActionTypes.SET_PASSWORD2:
      return executeReducerAction({
        state,
        stateAttrName: 'password2',
        action,
        actionAttrName: 'newPassword2',
      });
    default:
      return _registerStateReducerForAvatar(state, action);
  }
}

function _registerStateReducerForAvatar(
  state: RegisterReducerState,
  action: RegisterReducerAction
): RegisterReducerState {
  const doSetAvatar = action.type === RegisterReducerActionTypes.SET_AVATAR;

  if (doSetAvatar) {
    return executeReducerAction({
      state,
      stateAttrName: 'avatar',
      action,
      actionAttrName: 'newAvatar',
    });
  }

  return _registerStateReducerForPersonalInfo(state, action);
}

function _registerStateReducerForPersonalInfo(
  state: RegisterReducerState,
  action: RegisterReducerAction
): RegisterReducerState {
  switch (action.type) {
    case RegisterReducerActionTypes.SET_FIRST_NAME:
      return executeReducerAction({
        state,
        stateAttrName: 'firstName',
        action,
        actionAttrName: 'newFirstName',
      });
    case RegisterReducerActionTypes.SET_LAST_NAME:
      return executeReducerAction({
        state,
        stateAttrName: 'lastName',
        action,
        actionAttrName: 'newLastName',
      });
    case RegisterReducerActionTypes.SET_DATE_OF_BIRTH:
      return executeReducerAction({
        state,
        stateAttrName: 'dateOfBirth',
        action,
        actionAttrName: 'newDateOfBirth',
      });
    default:
      return _registerStateReducerForBodySize(state, action);
  }
}

function _registerStateReducerForBodySize(
  state: RegisterReducerState,
  action: RegisterReducerAction
): RegisterReducerState {
  switch (action.type) {
    case RegisterReducerActionTypes.SET_WEIGHT:
      return executeReducerAction({
        state,
        stateAttrName: 'weight',
        action,
        actionAttrName: 'newWeight',
      });
    case RegisterReducerActionTypes.SET_HEIGHT:
      return executeReducerAction({
        state,
        stateAttrName: 'height',
        action,
        actionAttrName: 'newHeight',
      });
    default:
      return _registerStateReducerForPlayStyle(state, action);
  }
}

function _registerStateReducerForPlayStyle(
  state: RegisterReducerState,
  action: RegisterReducerAction
): RegisterReducerState {
  switch (action.type) {
    case RegisterReducerActionTypes.SET_BEST_HAND:
      return executeReducerAction({
        state,
        stateAttrName: 'bestHand',
        action,
        actionAttrName: 'newBestHand',
      });
    case RegisterReducerActionTypes.SET_BACKHAND:
      return executeReducerAction({
        state,
        stateAttrName: 'backhand',
        action,
        actionAttrName: 'newBackhand',
      });
    default:
      return _registerStateReducerForHometown(state, action);
  }
}

function _registerStateReducerForHometown(
  state: RegisterReducerState,
  action: RegisterReducerAction
): RegisterReducerState {
  switch (action.type) {
    case RegisterReducerActionTypes.SET_HOMETOWN_COUNTRY:
      return executeReducerAction({
        state,
        stateAttrName: 'hometownCountry',
        action,
        actionAttrName: 'newHometownCountry',
      });
    case RegisterReducerActionTypes.SET_HOMETOWN_STATE_PROVINCE:
      return executeReducerAction({
        state,
        stateAttrName: 'hometownStateProvince',
        action,
        actionAttrName: 'newHometownStateProvince',
      });
    default:
      return _registerStateReducerForHometownCity(state, action);
  }
}

function _registerStateReducerForHometownCity(
  state: RegisterReducerState,
  action: RegisterReducerAction
): RegisterReducerState {
  const doSetHometownCity =
    action.type === RegisterReducerActionTypes.SET_HOMETOWN_CITY;

  if (doSetHometownCity) {
    return executeReducerAction({
      state,
      stateAttrName: 'hometownCity',
      action,
      actionAttrName: 'newHometownCity',
    });
  }

  throw new ActionTypeUnrecognized(`${action.type} action type unrecognized`);
}
