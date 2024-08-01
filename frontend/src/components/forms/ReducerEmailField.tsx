import {makeDispatchHTMLInputChange} from '@/lib/services';
import { ReducerAction } from '@/types/reducers';
import {TextField} from '@mui/material';
import {Dispatch} from 'react';

export default function ReducerEmailField<T extends ReducerAction>({
  dispatch,
  actiontype,
}: {
  dispatch: Dispatch<T>;
  actiontype: T['type'];
}) {
  return (
    <TextField
      id="email"
      label="Email"
      name="email"
      variant="outlined"
      type="email"
      onChange={makeDispatchHTMLInputChange(
        dispatch,
        actiontype,
        'newEmail' as keyof T
      )}
      required
    />
  );
}
