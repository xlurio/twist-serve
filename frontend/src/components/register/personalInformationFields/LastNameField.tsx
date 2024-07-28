import {makeDispatchHTMLInputChange} from '@/lib/services';
import {RegisterReducerAction, RegisterReducerActionTypes} from '@/types';
import { TextField } from '@mui/material';
import {Dispatch} from 'react';

export default function LastNameField({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}) {
  return (
    <TextField
      id="last_name"
      label="Last name"
      name="last_name"
      variant="outlined"
      onChange={makeDispatchHTMLInputChange(
        dispatch,
        RegisterReducerActionTypes.SET_LAST_NAME,
        'newLastName'
      )}
      required
    />
  );
}
