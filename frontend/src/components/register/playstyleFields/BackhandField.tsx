import {RegisterReducerAction, RegisterReducerActionTypes} from '@/types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {Dispatch, ReactNode} from 'react';
import 'dayjs/locale/en';
import {makeDispatchHTMLInputChange} from '@/lib/services';

export default function BackhandField({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}): JSX.Element {
  return (
    <FormControl fullWidth>
      <InputLabel id="backhand-label">Backhand</InputLabel>
      <Select
        labelId="backhand-label"
        id="backhand"
        variant="outlined"
        onChange={
          makeDispatchHTMLInputChange(
            dispatch,
            RegisterReducerActionTypes.SET_BACKHAND,
            'newBackhand'
          ) as (
            event: SelectChangeEvent<HTMLSelectElement>,
            child: ReactNode
          ) => void
        }
      >
        <MenuItem value="one-handed">One-handed backhand</MenuItem>
        <MenuItem value="two-handed">Two-handed backhand</MenuItem>
      </Select>
    </FormControl>
  );
}
