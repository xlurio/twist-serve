import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {getAccountsMe} from '@/lib/adapters';
import {cache} from 'react';
import { refreshOrLogoutOn401 } from './refreshOrLogout';
import { GetAuthenticatedUserResponseData } from '@/types/http/accounts';

export const retrieveAuthenticatedAccount = cache(
  async (
    router: AppRouterInstance
  ): Promise<GetAuthenticatedUserResponseData | null> => {
    const response = await refreshOrLogoutOn401({
      backendRequestCallback: getAccountsMe,
      router,
    });
    return response?.data.data || null;
  }
);