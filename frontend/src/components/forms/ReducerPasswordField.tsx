import {makeDispatchHTMLInputChange} from '@/lib/services';
import { ReducerAction } from '@/types/reducers';
import {TextField, TextFieldProps} from '@mui/material';
import {Dispatch} from 'react';

export default function ReducerPasswordField<T extends ReducerAction>(
  props: {
    dispatch: Dispatch<T>;
    actiontype: T['type'];
    actionAttrName?: keyof T;
  } & Omit<TextFieldProps, 'variant'>
): JSX.Element {
  const {dispatch, actiontype, actionAttrName, ...otherProps} = props;

  return (
    <TextField
      id="password"
      label="Password"
      name="password"
      variant="outlined"
      type="password"
      onChange={makeDispatchHTMLInputChange(
        dispatch,
        actiontype,
        actionAttrName || ('newPassword' as keyof T)
      )}
      required
      {...otherProps}
    />
  );
}
