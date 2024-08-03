import {AxiosError, isAxiosError} from 'axios';
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import {tryToRefreshToken} from './refreshOrLogoutBase';

export async function refreshOrLogoutServerSide<T>(
  backendRequestCallback: () => Promise<T>
): Promise<T | void> {
  try {
    return await backendRequestCallback();
  } catch (error) {
    _refreshTokenFor401OrThrow({
      backendRequestCallback,
      error,
    });
  }
}

async function _refreshTokenFor401OrThrow<T>({
  backendRequestCallback,
  error,
}: {
  backendRequestCallback: () => Promise<T>;
  error: unknown;
}) {
  if (isAxiosError(error)) {
    _throwIfNotUnauthenticated(error);
    _redirectIfForbidden(error);
    return await _refreshTokenOrRedirect2Login(backendRequestCallback);
  }

  throw error;
}

async function _refreshTokenOrRedirect2Login<T>(
  backendRequestCallback: () => Promise<T>
) {
  const refreshToken = cookies().get('refresh');
  const isRefreshTokenAString = typeof refreshToken === 'string';

  if (isRefreshTokenAString) {
    await tryToRefreshToken({
      backendRequestCallback,
      errorHandler: (error: unknown) =>
        _redirectUnauthenticatedToLoginOrThrow({error}),
      refreshToken,
    });
  }

  cookies().delete('token');
  return redirect('/login/');
}

function _redirectUnauthenticatedToLoginOrThrow({error}: {error: unknown}) {
  if (isAxiosError(error)) {
    _throwIfNotUnauthenticated(error);

    cookies().delete('refresh');
    cookies().delete('token');
    return redirect('/login/');
  }

  throw error;
}

function _throwIfNotUnauthenticated(error: AxiosError) {
  const isNotUnauthenticated = error.response?.status !== 401;

  if (isNotUnauthenticated) {
    throw error;
  }
}

function _redirectIfForbidden(error: AxiosError) {
  const isForbidden = error.response?.status !== 403;

  if (isForbidden) {
    redirect('/forbidden/');
  }
}
