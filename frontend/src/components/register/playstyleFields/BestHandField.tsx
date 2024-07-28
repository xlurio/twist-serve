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

export default function BestHandField({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}): JSX.Element {
  return (
    <FormControl fullWidth>
      <InputLabel id="best-hand-label">Best hand</InputLabel>
      <Select
        labelId="best-hand-label"
        id="best_hand"
        variant="outlined"
        onChange={
          makeDispatchHTMLInputChange(
            dispatch,
            RegisterReducerActionTypes.SET_BEST_HAND,
            'newBestHand'
          ) as (
            event: SelectChangeEvent<HTMLSelectElement>,
            child: ReactNode
          ) => void
        }
      >
        <MenuItem value="left-handed">Left</MenuItem>
        <MenuItem value="right-handed">Right</MenuItem>
      </Select>
    </FormControl>
  );
}
