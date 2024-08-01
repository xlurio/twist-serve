import {Stack} from '@mui/material';
import {Dispatch} from 'react';
import ReducerPasswordField from '../forms/ReducerPasswordField';
import ReducerEmailField from '../forms/ReducerEmailField';
import { RegisterReducerAction, RegisterReducerActionTypes } from '@/types/reducers';

export default function CredentialFields({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}) {
  return (
    <Stack gap={1}>
      <h2>Credentials</h2>
      <ReducerEmailField
        dispatch={dispatch}
        actiontype={RegisterReducerActionTypes.SET_EMAIL}
      />
      <ReducerPasswordField
        dispatch={dispatch}
        actiontype={RegisterReducerActionTypes.SET_PASSWORD}
      />
      <ReducerPasswordField
        dispatch={dispatch}
        actiontype={RegisterReducerActionTypes.SET_PASSWORD2}
        id="password2"
        label="Repeat the password"
        name="password2"
        actionAttrName="newPassword2"
      />
    </Stack>
  );
}
