import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

export default function SurfaceField(): JSX.Element {
  return (
    <FormControl fullWidth>
      <InputLabel id="surface-label">Surface</InputLabel>
      <Select
        labelId="surface-label"
        name="surface"
        id="surface"
        variant="outlined"
      >
        <MenuItem value="clay">Clay</MenuItem>
        <MenuItem value="grass">Grass</MenuItem>
        <MenuItem value="hard">Hard</MenuItem>
      </Select>
    </FormControl>
  );
}
