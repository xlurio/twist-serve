import {createPlayer} from '@/lib/adapters';
import {dispatchErrorMessageForAxios} from '@/lib/services';
import {redirectAfterLogin} from '@/lib/services/http';
import {
  ReducerAction,
  RegisterReducerAction,
  RegisterReducerActionTypes,
  RegisterReducerState,
} from '@/types/reducers';
import dayjs from 'dayjs';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {Dispatch, FormEvent} from 'react';

function _makeRegisterPayloadFromState(state: RegisterReducerState) {
  return {
    avatar: state.avatar || null,
    email: state.email,
    first_name: state.firstName,
    last_name: state.lastName,
    password: state.password,
    date_of_birth: dayjs(state.dateOfBirth).format('YYYY-MM-DD'),
    hometown_country: state.hometownCountry,
    hometown_state_province: state.hometownStateProvince,
    hometown_city: state.hometownCity,
    weight: state.weight,
    height: state.height,
    best_hand: state.bestHand,
    backhand: state.backhand,
  };
}

async function _tryToRegister({
  state,
  dispatch,
  router,
}: {
  state: RegisterReducerState;
  dispatch: Dispatch<RegisterReducerAction>;
  router: AppRouterInstance;
}) {
  try {
    await createPlayer(_makeRegisterPayloadFromState(state));
    await _redirectToLoginIfNotAbleToGetAccessToken({state, router});
  } catch (error) {
    dispatchErrorMessageForAxios({
      error: error as Error,
      dispatch: dispatch as Dispatch<{newErrorMessage: string} & ReducerAction>,
      actionType: RegisterReducerActionTypes.SET_ERROR_MESSAGE,
    });
  }
}

async function _redirectToLoginIfNotAbleToGetAccessToken({
  state,
  router,
}: {
  state: RegisterReducerState;
  router: AppRouterInstance;
}) {
  try {
    await redirectAfterLogin({
      email: state.email,
      password: state.password,
      router,
    });
  } catch (_error) {
    router.push('/login/');
  }
}

async function _submitRegisterForm({
  state,
  dispatch,
  router,
  event,
}: {
  state: RegisterReducerState;
  dispatch: Dispatch<RegisterReducerAction>;
  router: AppRouterInstance;
  event: FormEvent<HTMLFormElement>;
}) {
  const form = event.target as HTMLFormElement;

  if (form.reportValidity()) {
    await _tryToRegister({
      state,
      dispatch,
      router,
    });
  }
}

async function _processRegisterForm({
  state,
  dispatch,
  router,
  event,
}: {
  state: RegisterReducerState;
  dispatch: Dispatch<RegisterReducerAction>;
  router: AppRouterInstance;
  event: FormEvent<HTMLFormElement>;
}) {
  const passwordDoesntMatch = state.password !== state.password2;

  if (passwordDoesntMatch) {
    return dispatch({
      type: RegisterReducerActionTypes.SET_ERROR_MESSAGE,
      newErrorMessage: "Passwords don't match",
    });
  }

  await _submitRegisterForm({
    state,
    dispatch,
    router,
    event,
  });
}

function _makeFormSubmitHandlerCallback({
  state,
  dispatch,
  router,
}: {
  state: RegisterReducerState;
  dispatch: Dispatch<RegisterReducerAction>;
  router: AppRouterInstance;
}) {
  return async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return _processRegisterForm({
      state,
      dispatch,
      router,
      event,
    });
  };
}

export default function RegisterFormContainer({
  children,
  state,
  dispatch,
  router,
}: {
  children: React.ReactNode;
  state: RegisterReducerState;
  dispatch: Dispatch<RegisterReducerAction>;
  router: AppRouterInstance;
}): JSX.Element {
  return (
    <form
      onSubmit={_makeFormSubmitHandlerCallback({state, dispatch, router})}
      method="post"
    >
      {children}
    </form>
  );
}
