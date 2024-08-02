import {TextField, TextFieldProps} from '@mui/material';

export default function EmailField(props: Omit<TextFieldProps, 'variant'>) {
  return (
    <TextField
      id="email"
      label="Email"
      name="email"
      variant="outlined"
      type="email"
      required
      {...props}
    />
  );
}
