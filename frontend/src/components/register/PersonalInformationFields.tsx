import {Stack} from '@mui/material';
import NumberField from '@/components/forms/NumberField';
import FirstNameField from './personalInformationFields/FirstNameField';
import LastNameField from './personalInformationFields/LastNameField';
import DateOfBirthField from './personalInformationFields/DateOfBirthField';
import AvatarField from './personalInformationFields/AvatarField';

export default function PersonalInformationFields(): JSX.Element {
  return (
    <Stack gap={1}>
      <h2>Personal Information</h2>
      <AvatarField />
      <FirstNameField />
      <LastNameField />
      <DateOfBirthField />
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
