import {RegisterReducerAction, RegisterReducerActionTypes} from '@/types';
import {TextField} from '@mui/material';
import {Dispatch} from 'react';
import 'dayjs/locale/en';
import {makeDispatchHTMLInputChange} from '@/lib/services';

export default function HometownCityField({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}): JSX.Element {
  return (
    <TextField
      id="city"
      label="City"
      name="city"
      variant="outlined"
      onChange={makeDispatchHTMLInputChange(
        dispatch,
        RegisterReducerActionTypes.SET_HOMETOWN_CITY,
        'newHometownCity'
      )}
      required
    />
  );
}
