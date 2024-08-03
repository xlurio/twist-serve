import { TextField } from "@mui/material";

export default function MainAddressFields(): JSX.Element {
  return (
    <>
      <TextField
        id="street"
        label="Street"
        name="street"
        variant="outlined"
        required
      />
      <TextField
        id="building_number"
        label="Building number"
        name="building_number"
        variant="outlined"
      />
    </>
  );
}
