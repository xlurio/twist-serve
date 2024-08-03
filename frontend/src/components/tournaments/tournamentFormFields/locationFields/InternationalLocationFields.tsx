import { TextField } from "@mui/material";

export default function InternationalLocationFields(): JSX.Element {
  return (
    <>
      <TextField
        id="country"
        label="Country"
        name="country"
        variant="outlined"
        required
      />
      <TextField
        id="state_province"
        label="State/province"
        name="state_province"
        variant="outlined"
      />
      <TextField
        id="city"
        label="City"
        name="city"
        variant="outlined"
        required
      />
    </>
  );
}
