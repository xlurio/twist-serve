import {makeDispatchHTMLInputChange} from '@/lib/services';
import {ReducerAction} from '@/types';
import {TextField} from '@mui/material';
import {Dispatch} from 'react';

export default function ReducerEmailField<T extends ReducerAction>({
  dispatch,
  actionType,
}: {
  dispatch: Dispatch<T>;
  actionType: T['type'];
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
        actionType,
        'newEmail' as keyof T
      )}
      required
    />
  );
}
