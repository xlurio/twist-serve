import {makeDispatchHTMLInputChange} from '@/lib/services';
import {RegisterReducerAction, RegisterReducerActionTypes} from '@/types';
import { TextField } from '@mui/material';
import {Dispatch} from 'react';

export default function FirstNameField({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}) {
  return (
    <TextField
      id="first_name"
      label="First name"
      name="first_name"
      variant="outlined"
      onChange={makeDispatchHTMLInputChange(
        dispatch,
        RegisterReducerActionTypes.SET_FIRST_NAME,
        'newFirstName'
      )}
      required
    />
  );
}
