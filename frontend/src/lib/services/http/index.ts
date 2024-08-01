import {
  BackendResponse,
  GetTokenRequest,
} from '@/types/http';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {getToken} from '../../adapters';
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
    const errorMessage = error.response ? error.response.data.message : error;
    dispatch(setMessage(`Something went wrong: ${errorMessage}`));
  }

  dispatch(setMessage('Something went wrong'));
  console.trace(error);
}
