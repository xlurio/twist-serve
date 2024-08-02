import { TextField } from '@mui/material';

export default function LastNameField() {
  return (
    <TextField
      id="last_name"
      label="Last name"
      name="last_name"
      variant="outlined"
      required
    />
  );
}
