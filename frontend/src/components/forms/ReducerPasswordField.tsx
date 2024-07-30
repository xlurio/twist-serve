import {makeDispatchHTMLInputChange} from '@/lib/services';
import {ReducerAction} from '@/types';
import {TextField, TextFieldProps} from '@mui/material';
import {Dispatch} from 'react';

export default function ReducerPasswordField<T extends ReducerAction>(
  props: {
    dispatch: Dispatch<T>;
    actionType: T['type'];
    actionAttrName?: keyof T;
  } & Omit<TextFieldProps, 'variant'>
): JSX.Element {
  return (
    <TextField
      id="password"
      label="Password"
      name="password"
      variant="outlined"
      type="password"
      onChange={makeDispatchHTMLInputChange(
        props.dispatch,
        props.actionType,
        props.actionAttrName || ('newPassword' as keyof T)
      )}
      required
      {...props}
    />
  );
}
