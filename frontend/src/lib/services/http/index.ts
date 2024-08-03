import {BackendResponse, GetTokenRequest} from '@/types/http';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {postToken} from '../../adapters';
import {AxiosError, isAxiosError} from 'axios';
import {CustomThunkDispatch} from '@/types';
import {setMessage} from '../../features/snackBarSlice';

export async function redirectAfterLogin({
  email,
  password,
  rememberMe,
  router,
}: {
  rememberMe?: boolean;
  router: AppRouterInstance;
} & GetTokenRequest) {
  await login({email, password, rememberMe});
  router.push('/');
}

export async function login({
  email,
  password,
  rememberMe,
}: {
  rememberMe?: boolean;
} & GetTokenRequest) {
  const response = await postToken({email, password});
  if (rememberMe) {
    document.cookie =
      `token=${response.data.data.access};` +
      `expires=${response.data.data.lifetime}`;
    document.cookie =
      `refresh=${response.data.data.refresh}; ` +
      `expires=${response.data.data.lifetime}`;
  }

  document.cookie = `token=${response.data.data.access}`;
}

export async function triggerSnackBarOnRequestError<T>(
  backendRequestCallback: () => Promise<T>,
  dispatch: CustomThunkDispatch
): Promise<T | void> {
  try {
    return await backendRequestCallback();
  } catch (error) {
    _triggerSnackBarForErrorDuringRequest({error, dispatch});
  }
}

function _triggerSnackBarForErrorDuringRequest({
  error,
  dispatch,
}: {
  error: unknown;
  dispatch: CustomThunkDispatch;
}) {
  if (isAxiosError(error)) {
    return _triggerSnackBarForAxiosError({error, dispatch});
  }

  dispatch(setMessage('Something went wrong'));
  console.trace(error);
}

function _triggerSnackBarForAxiosError({
  error,
  dispatch,
}: {
  error: AxiosError<BackendResponse>;
  dispatch: CustomThunkDispatch;
}) {
  const isClientError = error.response
    ? 400 <= error.response.status && error.response.status < 500
    : false;

  if (isClientError) {
    const errorMessage = error.response?.data.message || error;
    dispatch(setMessage(`Something went wrong: ${errorMessage}`));
  }

  dispatch(setMessage('Something went wrong'));
  console.trace(error);
}
