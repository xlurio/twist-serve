import {TextField, TextFieldProps} from '@mui/material';

export default function PasswordField(
  props: Omit<TextFieldProps, 'variant'>
): JSX.Element {
  return (
    <TextField
      id="password"
      label="Password"
      name="password"
      variant="outlined"
      type="password"
      required
      {...props}
    />
  );
}
