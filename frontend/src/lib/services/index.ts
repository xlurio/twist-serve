import {ChangeEvent, Dispatch} from 'react';
import {MissingActionRequiredValue} from '../errors';
import {createPlayer} from '../adapters';
import {isAxiosError} from 'axios';
import {CreatePlayerRequest} from '@/types/http';
import {ReducerAction, ReducerActionType, ReducerState} from '@/types/reducers';

export function makeDispatchHTMLInputChange<T extends ReducerAction>(
  dispatch: Dispatch<T>,
  actionType: T['type'],
  actionValueAttr: keyof T
) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const action = {
      type: actionType,
    } as T;
    action[actionValueAttr] = event.target.value as T[keyof T];
    dispatch(action);
  };
}

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

export async function register(data: CreatePlayerRequest) {
  const response = await createPlayer(data);
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
  if (isAxiosError(error)) {
    const message = error.response
      ? (error.response.data.message as string)
      : undefined;
    return dispatch({
      type: actionType,
      newErrorMessage:
        'Something went wrong' + (message ? `: ${message}` : `: ${error}`),
    } as T);
  }

  dispatch({
    type: actionType,
    newErrorMessage: 'Something went wrong' + (error ? `: ${error}` : ''),
  } as T);
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
