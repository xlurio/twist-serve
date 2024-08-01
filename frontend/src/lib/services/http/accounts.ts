import {AxiosError, isAxiosError} from 'axios';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Cookies from 'js-cookie';
import {GetAuthenticatedUserResponseData} from '@/types/http';
import {getAuthenticatedUser, refreshAccessToken} from '@/lib/adapters';

export async function myAccountData(
  router: AppRouterInstance
): Promise<GetAuthenticatedUserResponseData | null> {
  const response = await _refreshOrLogoutOn401({
    backendRequestCallback: getAuthenticatedUser,
    router,
  });
  return response ? response.data.data : null;
}

async function _refreshOrLogoutOn401<T>({
  backendRequestCallback,
  router,
}: {
  backendRequestCallback: () => Promise<T>;
  router: AppRouterInstance;
}): Promise<T | void> {
  try {
    return await backendRequestCallback();
  } catch (error) {
    _refreshTokenFor401OrThrow({
      backendRequestCallback,
      router,
      error,
    });
  }
}

async function _refreshTokenFor401OrThrow<T>({
  backendRequestCallback,
  router,
  error,
}: {
  backendRequestCallback: () => Promise<T>;
  router: AppRouterInstance;
  error: unknown;
}) {
  if (isAxiosError(error)) {
    _throwIfNotUnauthenticated(error);
    return await _refreshTokenOrRedirect2Login({
      backendRequestCallback,
      router,
    });
  }

  throw error;
}

async function _refreshTokenOrRedirect2Login<T>({
  backendRequestCallback,
  router,
}: {
  backendRequestCallback: () => Promise<T>;
  router: AppRouterInstance;
}) {
  const refreshToken = Cookies.get('refresh');

  if (refreshToken) {
    await _tryToRefreshToken({
      backendRequestCallback,
      router,
      refreshToken,
    });
  }

  Cookies.remove('token');
  return router.push('/login/');
}

async function _tryToRefreshToken<T>({
  backendRequestCallback,
  router,
  refreshToken,
}: {
  backendRequestCallback: () => Promise<T>;
  router: AppRouterInstance;
  refreshToken: string;
}) {
  try {
    const refreshTokenAccessResponse = await refreshAccessToken({
      refresh: refreshToken,
    });
    const {access, lifetime} = refreshTokenAccessResponse.data.data;
    document.cookie = `token=${access}; expires=${lifetime}`;

    return await backendRequestCallback();
  } catch (error) {
    _redirectUnauthenticatedToLoginOrThrow({
      router,
      error,
    });
  }
}

function _redirectUnauthenticatedToLoginOrThrow({
  router,
  error,
}: {
  router: AppRouterInstance;
  error: unknown;
}) {
  if (isAxiosError(error)) {
    _throwIfNotUnauthenticated(error);

    Cookies.remove('refresh');
    Cookies.remove('token');
    return router.push('/login/');
  }

  throw error;
}

function _throwIfNotUnauthenticated(error: AxiosError) {
  const isNotUnauthenticated = error.response
    ? error.response.status !== 401
    : false;

  if (isNotUnauthenticated) {
    throw error;
  }
}
