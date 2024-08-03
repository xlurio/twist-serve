import {Dispatch} from 'react';
import {MissingActionRequiredValue} from '../errors';
import {postPlayers} from '../adapters';
import {isAxiosError} from 'axios';
import {CreatePlayerRequest} from '@/types/http';
import {ReducerAction, ReducerActionType, ReducerState} from '@/types/reducers';

export function executeReducerAction<
  T extends ReducerState,
  K extends ReducerAction,
>({
  state,
  stateAttrName,
  action,
  actionAttrName,
}: {
  state: T;
  stateAttrName: keyof T;
  action: K;
  actionAttrName: string & keyof K;
}): T {
  checkForActionValue({
    action,
    actionAttrName,
  });
  const newState = {...state};
  newState[stateAttrName] = action[actionAttrName] as unknown as T[keyof T];
  return newState;
}

export async function registerPlayer(data: CreatePlayerRequest) {
  const response = await postPlayers(data);
  return response;
}

export function dispatchErrorMessageForAxios<
  T extends {newErrorMessage: string} & ReducerAction,
  K extends ReducerActionType,
>({
  error,
  dispatch,
  actionType,
}: {
  error: Error;
  dispatch: Dispatch<T>;
  actionType: K;
}) {
  dispatch({
    type: actionType,
    newErrorMessage: getMessageForRequestError(error),
  } as T);
}

export function getMessageForRequestError(error: unknown) {
  if (isAxiosError(error)) {
    const message = error.response?.data.message || error;
    return `Something went wrong ${message}`;
  }

  return 'Something went wrong';
}

export function checkForActionValue<T extends ReducerAction>({
  action,
  actionAttrName,
}: {
  action: T;
  actionAttrName: string & keyof T;
}) {
  if (action[actionAttrName] === undefined) {
    throw new MissingActionRequiredValue(
      `'${actionAttrName}' must be set for '${action.type}' type action`
    );
  }
}
