import { TextField } from '@mui/material';

export default function FirstNameField() {
  return (
    <TextField
      id="first_name"
      label="First name"
      name="first_name"
      variant="outlined"
      required
    />
  );
}
