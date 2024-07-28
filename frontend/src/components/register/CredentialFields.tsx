import {RegisterReducerAction, RegisterReducerActionTypes} from '@/types';
import {Stack} from '@mui/material';
import {Dispatch} from 'react';
import ReducerPasswordField from '../forms/ReducerPasswordField';
import ReducerEmailField from '../forms/ReducerEmailField';

export default function CredentialFields({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}) {
  return (
    <Stack>
      <h2>Credentials</h2>
      <ReducerEmailField
        dispatch={dispatch}
        actionType={RegisterReducerActionTypes.SET_EMAIL}
      />
      <ReducerPasswordField
        dispatch={dispatch}
        actionType={RegisterReducerActionTypes.SET_PASSWORD}
      />
      <ReducerPasswordField
        dispatch={dispatch}
        actionType={RegisterReducerActionTypes.SET_PASSWORD2}
        id="password2"
        label="Repeat the password"
        name="password2"
        actionAttrName="newPassword2"
      />
    </Stack>
  );
}
