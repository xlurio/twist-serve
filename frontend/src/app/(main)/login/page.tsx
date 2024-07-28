'use client';
import {Button, Container, Link, Stack, Typography} from '@mui/material';
import {Dispatch, FormEvent, useCallback, useReducer} from 'react';
import {useRouter} from 'next/navigation';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
  LoginReducerAction,
  LoginReducerActionTypes,
  LoginReducerState,
  ReducerAction,
} from '@/types';
import theme from '@/theme';
import {
  dispatchErrorMessageForAxios,
  executeReducerAction,
  redirectAfterLogin,
} from '@/lib/services';
import LoginFields from '@/components/login/LoginFields';
import {ActionTypeUnrecognized} from '@/lib/errors';
import {useCheckIfIsAuthenticatedEffect} from '@/lib/hooks';

async function _tryToLogin({
  state,
  router,
  dispatch,
}: {
  state: LoginReducerState;
  router: AppRouterInstance;
  dispatch: Dispatch<LoginReducerAction>;
}) {
  try {
    await redirectAfterLogin({
      email: state.email,
      password: state.password,
      rememberMe: state.rememberMe,
      router,
    });
  } catch (error) {
    dispatchErrorMessageForAxios({
      error: error as Error,
      dispatch: dispatch as Dispatch<{newErrorMessage: string} & ReducerAction>,
      actionType: LoginReducerActionTypes.SET_ERROR_MESSAGE,
    });
  }
}

function _useHandleFormSubmitCallback(data: {
  state: LoginReducerState;
  router: AppRouterInstance;
  dispatch: Dispatch<LoginReducerAction>;
}) {
  return useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if ((event.target as HTMLFormElement).reportValidity()) {
        await _tryToLogin(data);
      }
    },
    [data]
  );
}

function _loginStateReducer(
  state: LoginReducerState,
  action: LoginReducerAction
) {
  const doSetErrorMessage =
    action.type === LoginReducerActionTypes.SET_ERROR_MESSAGE;

  if (doSetErrorMessage) {
    return {
      ...state,
      errorMessage: action.newErrorMessage,
    };
  }

  return _loginStateReducerForForm(state, action);
}

function _loginStateReducerForForm(
  state: LoginReducerState,
  action: LoginReducerAction
) {
  switch (action.type) {
    case LoginReducerActionTypes.SET_EMAIL:
      return executeReducerAction({
        state,
        stateAttrName: 'email',
        action,
        actionAttrName: 'newEmail',
      });
    case LoginReducerActionTypes.SET_PASSWORD:
      return executeReducerAction({
        state,
        stateAttrName: 'password',
        action,
        actionAttrName: 'newPassword',
      });
    default:
      return _loginStateReducerForRememberMe(state, action);
  }
}

function _loginStateReducerForRememberMe(
  state: LoginReducerState,
  action: LoginReducerAction
) {
  const doSetRememberMe =
    action.type === LoginReducerActionTypes.SET_REMEMBER_ME;

  if (doSetRememberMe) {
    return executeReducerAction({
      state,
      stateAttrName: 'rememberMe',
      action,
      actionAttrName: 'newRememberMe',
    });
  }

  throw new ActionTypeUnrecognized(`${action.type} action type unrecognized`);
}

function _useLoginState() {
  const router = useRouter();
  const [isAuthenticated, _] = useCheckIfIsAuthenticatedEffect();

  if (isAuthenticated) {
    router.push('/');
  }

  const [state, dispatch] = useReducer(_loginStateReducer, {
    email: '',
    password: '',
    rememberMe: false,
  });

  return {
    state,
    dispatch,
    handleFormSubmit: _useHandleFormSubmitCallback({state, router, dispatch}),
  };
}

export default function Login() {
  const {state, dispatch, handleFormSubmit} = _useLoginState();

  return (
    <Container>
      <form method="post" onSubmit={handleFormSubmit}>
        <Stack gap={1}>
          <h2>Login</h2>
          <LoginFields dispatch={dispatch} />
          <Typography sx={{color: theme.palette.error.main}}>
            {state.errorMessage}
          </Typography>
          <Button sx={{margin: '1em 0'}} type="submit" variant="contained">
            Login
          </Button>
          <Link href="/register/">I don&apos;t have an account</Link>
        </Stack>
      </form>
    </Container>
  );
}
