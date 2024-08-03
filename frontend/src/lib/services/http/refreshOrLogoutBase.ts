import { postTokenRefresh } from "@/lib/adapters";

export async function tryToRefreshToken<T>({
  backendRequestCallback,
  refreshToken,
  errorHandler,
}: {
  backendRequestCallback: () => Promise<T>;
  refreshToken: string;
  errorHandler: (error: unknown) => void;
}) {
  try {
    const refreshTokenAccessResponse = await postTokenRefresh({
      refresh: refreshToken,
    });
    const {access, lifetime} = refreshTokenAccessResponse.data.data;
    document.cookie = `token=${access}; expires=${lifetime}`;

    return await backendRequestCallback();
  } catch (error) {
    errorHandler(error)
  }
}
