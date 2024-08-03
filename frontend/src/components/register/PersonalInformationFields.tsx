import {Stack} from '@mui/material';
import NumberField from '@/components/forms/NumberField';
import FirstNameField from './personalInformationFields/FirstNameField';
import LastNameField from './personalInformationFields/LastNameField';
import DatePickerField from '../forms/DateOfBirthField';
import AvatarField from '../forms/AvatarField';

export default function PersonalInformationFields(): JSX.Element {
  return (
    <Stack gap={1}>
      <h2>Personal Information</h2>
      <AvatarField />
      <FirstNameField />
      <LastNameField />
      <DatePickerField name="date_of_birth" label="Date of birth" />
      <NumberField
        id="weight"
        label="Weight (kg)"
        name="weight"
        variant="outlined"
        required
      />
      <NumberField
        id="height"
        label="Height (cm)"
        name="height"
        variant="outlined"
        required
      />
    </Stack>
  );
}
