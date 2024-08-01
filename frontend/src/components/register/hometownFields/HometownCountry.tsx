import {TextField} from '@mui/material';
import {Dispatch} from 'react';

import {makeDispatchHTMLInputChange} from '@/lib/services';
import { RegisterReducerAction, RegisterReducerActionTypes } from '@/types/reducers';

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
