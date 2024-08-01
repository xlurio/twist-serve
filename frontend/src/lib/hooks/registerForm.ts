import {useRouter} from 'next/navigation';
import {useReducer} from 'react';

import {useCheckIfIsAuthenticatedEffect} from '../hooks';
import { RegisterReducerState } from '@/types/reducers';
import { registerStateReducer } from '../reducers/registerForm';

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
