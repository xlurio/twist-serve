import {FormControl, Stack} from '@mui/material';
import ReducerPasswordField from '@/components/forms/ReducerPasswordField';
import ReducerEmailField from '@/components/forms/ReducerEmailField';
import Checkbox from '@/components/forms/Checkbox';
import {ChangeEvent, Dispatch} from 'react';
import {LoginReducerAction, LoginReducerActionTypes} from '@/types/reducers';

function _makeHandleRememberMeChangeCallback(dispatch: Dispatch<LoginReducerAction>) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: LoginReducerActionTypes.SET_REMEMBER_ME,
      newRememberMe: event.target.checked,
    });
  };
}

export default function LoginFields({
  dispatch,
}: {
  dispatch: Dispatch<LoginReducerAction>;
}): JSX.Element {
  return (
    <FormControl>
      <Stack gap={1}>
        <ReducerEmailField
          dispatch={dispatch}
          actiontype={LoginReducerActionTypes.SET_EMAIL}
        />
        <ReducerPasswordField
          dispatch={dispatch}
          actiontype={LoginReducerActionTypes.SET_PASSWORD}
        />
        <Checkbox
          onChange={_makeHandleRememberMeChangeCallback(dispatch)}
          label="Remember me"
        />
      </Stack>
    </FormControl>
  );
}
