import {RegisterReducerState} from '@/types';
import {useRouter} from 'next/navigation';
import {useReducer} from 'react';
import 'dayjs/locale/en';
import {useCheckIfIsAuthenticatedEffect} from '../hooks';
import {registerStateReducer} from '../reducers';

function _makeRegisterInitialState(): RegisterReducerState {
  return {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    password2: '',
    dateOfBirth: null,
    weight: '',
    height: '',
    hometownCountry: '',
    hometownStateProvince: '',
    hometownCity: '',
    bestHand: '',
    backhand: '',
  };
}

export function useRegisterState() {
  const router = useRouter();
  const [isAuthenticated, _] = useCheckIfIsAuthenticatedEffect();

  if (isAuthenticated) {
    router.push('/');
  }

  const [state, dispatch] = useReducer(
    registerStateReducer,
    _makeRegisterInitialState()
  );

  return {
    state,
    dispatch,
    router,
    errorMessage: state.errorMessage,
  };
}
