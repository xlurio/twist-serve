import {Stack, TextField} from '@mui/material';

export default function HometownFields(): JSX.Element {
  return (
    <Stack gap={1}>
      <h2>Hometown</h2>
      <TextField
        id="country"
        label="Country"
        name="hometown_country"
        variant="outlined"
        required
      />
      <TextField
        id="state_province"
        label="State/province"
        name="hometown_state_province"
        variant="outlined"
      />
      <TextField
        id="city"
        label="City"
        name="hometown_city"
        variant="outlined"
        required
      />
    </Stack>
  );
}
