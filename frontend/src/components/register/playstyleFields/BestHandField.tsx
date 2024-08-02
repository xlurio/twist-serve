import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function BestHandField(): JSX.Element {
  return (
    <FormControl fullWidth>
      <InputLabel id="best-hand-label">Best hand</InputLabel>
      <Select
        labelId="best-hand-label"
        name="best_hand"
        id="best_hand"
        variant="outlined"
      >
        <MenuItem value="left-handed">Left</MenuItem>
        <MenuItem value="right-handed">Right</MenuItem>
      </Select>
    </FormControl>
  );
}
