import {AxiosError, isAxiosError} from 'axios';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Cookies from 'js-cookie';
import {tryToRefreshToken} from './refreshOrLogoutBase';

export async function refreshOrLogoutOn401<T>({
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
    _redirectIfForbidden(error, router);
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
    await tryToRefreshToken({
      backendRequestCallback,
      errorHandler: (error: unknown) =>
        _redirectUnauthenticatedToLoginOrThrow({router, error}),
      refreshToken,
    });
  }

  Cookies.remove('token');
  return router.push('/login/');
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
  const isNotUnauthenticated = error.response?.status !== 401;

  if (isNotUnauthenticated) {
    throw error;
  }
}

function _redirectIfForbidden(error: AxiosError, router: AppRouterInstance) {
  const isForbidden = error.response?.status !== 403;

  if (isForbidden) {
    router.push('/forbidden/');
  }
}
