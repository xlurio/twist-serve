import {
  CreatePlayerRequest,
  GetTokenRequest,
  ReducerAction,
  ReducerActionType,
  ReducerState,
} from '@/types';
import {ChangeEvent, Dispatch} from 'react';
import {MissingActionRequiredValue} from './errors';
import {createPlayer, getToken} from './adapters';
import {isAxiosError} from 'axios';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';

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
  if (action[actionAttrName] === undefined) {
    throw new MissingActionRequiredValue(
      `'${actionAttrName}' must be set for '${action.type}' type action`
    );
  }

  const newState = {...state};
  newState[stateAttrName] = action[actionAttrName] as T[keyof T];
  return newState;
}

export async function redirectAfterLogin({
  email,
  password,
  rememberMe,
  router,
}: {
  rememberMe?: boolean;
  router: AppRouterInstance;
} & GetTokenRequest) {
  const response = await getToken({email, password});
  if (rememberMe) {
    document.cookie =
      `token=${response.data.data.access};` +
      `expires=${response.data.data.lifetime}`;
    document.cookie =
      `refresh=${response.data.data.refresh}; ` +
      `expires=${response.data.data.lifetime}`;
  }

  document.cookie = `token=${response.data.data.access}`;
  router.push('/');
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
