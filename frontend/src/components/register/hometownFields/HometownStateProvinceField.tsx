import {
  TextField,
} from '@mui/material';
import {Dispatch} from 'react';

import {makeDispatchHTMLInputChange} from '@/lib/services';
import { RegisterReducerAction, RegisterReducerActionTypes } from '@/types/reducers';

export default function HometownStateProvinceField({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}): JSX.Element {
  return (
    <TextField
      id="state_province"
      label="State/province"
      name="state_province"
      variant="outlined"
      onChange={makeDispatchHTMLInputChange(
        dispatch,
        RegisterReducerActionTypes.SET_HOMETOWN_STATE_PROVINCE,
        'newHometownStateProvince'
      )}
      required
    />
  );
}
