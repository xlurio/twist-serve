import {Stack, TextField} from '@mui/material';
import AvatarField from '../forms/AvatarField';
import DatePickerField from '../forms/DateOfBirthField';
import SurfaceField from './tournamentFormFields/SurfaceField';
import NumberField from '../forms/NumberField';
import LocationFields from './tournamentFormFields/LocationFields';

export default function CreateTournamentFormFields(): JSX.Element {
  return (
    <Stack>
      <TextField
        label="Name"
        id="name"
        name="name"
        variant="outlined"
        required
      />
      <AvatarField />
      <LocationFields />
      <DatePickerField label="Start" name="start_date" />
      <DatePickerField label="End" name="end_date" />
      <SurfaceField />
      <NumberField
        id="slots"
        label="Slots"
        name="slots"
        variant="outlined"
        required
      />
    </Stack>
  );
}
