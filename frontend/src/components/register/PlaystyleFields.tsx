import {FormControl, InputLabel, MenuItem, Select, Stack} from '@mui/material';
import BestHandField from './playstyleFields/BestHandField';

export default function PlaystyleFields(): JSX.Element {
  return (
    <Stack gap={1}>
      <h2>Playstyle</h2>
      <BestHandField />
      <FormControl fullWidth>
        <InputLabel id="backhand-label">Backhand</InputLabel>
        <Select
          labelId="backhand-label"
          name="backhand"
          id="backhand"
          variant="outlined"
        >
          <MenuItem value="one-handed">One-handed backhand</MenuItem>
          <MenuItem value="two-handed">Two-handed backhand</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
