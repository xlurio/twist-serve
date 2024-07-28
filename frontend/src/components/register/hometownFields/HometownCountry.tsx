import {RegisterReducerAction, RegisterReducerActionTypes} from '@/types';
import {TextField} from '@mui/material';
import {Dispatch} from 'react';
import 'dayjs/locale/en';
import {makeDispatchHTMLInputChange} from '@/lib/services';

export default function HometownCountry({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}): JSX.Element {
  return (
    <TextField
      id="country"
      label="Country"
      name="country"
      variant="outlined"
      onChange={makeDispatchHTMLInputChange(
        dispatch,
        RegisterReducerActionTypes.SET_HOMETOWN_COUNTRY,
        'newHometownCountry'
      )}
      required
    />
  );
}
