import {FormControl, Stack} from '@mui/material';
import {LoginReducerAction, LoginReducerActionTypes} from '@/types';
import ReducerPasswordField from '@/components/forms/ReducerPasswordField';
import ReducerEmailField from '@/components/forms/ReducerEmailField';
import Checkbox from '@/components/forms/Checkbox';
import {ChangeEvent, Dispatch, useCallback} from 'react';

function _useHandleRememberMeChangeCallback(
  dispatch: Dispatch<LoginReducerAction>
) {
  return useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: LoginReducerActionTypes.SET_REMEMBER_ME,
        newRememberMe: event.target.checked,
      });
    },
    [dispatch]
  );
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
          actionType={LoginReducerActionTypes.SET_EMAIL}
        />
        <ReducerPasswordField
          dispatch={dispatch}
          actionType={LoginReducerActionTypes.SET_PASSWORD}
        />
        <Checkbox
          onChange={_useHandleRememberMeChangeCallback(dispatch)}
          label="Remember me"
        />
      </Stack>
    </FormControl>
  );
}
