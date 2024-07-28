import {makeDispatchHTMLInputChange} from '@/lib/services';
import {TextField, TextFieldProps} from '@mui/material';
import {Dispatch} from 'react';

export default function ReducerPasswordField<T, K>(
  props: {
    dispatch: Dispatch<T>;
    actionType: K;
    actionAttrName?: string;
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
        props.actionAttrName || 'newPassword'
      )}
      required
      {...props}
    />
  );
}
