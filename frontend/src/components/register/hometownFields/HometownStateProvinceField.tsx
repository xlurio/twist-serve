import {
  RegisterReducerAction,
  RegisterReducerActionTypes,
} from '@/types';
import {
  TextField,
} from '@mui/material';
import {Dispatch} from 'react';
import 'dayjs/locale/en';
import {makeDispatchHTMLInputChange} from '@/lib/services';

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
