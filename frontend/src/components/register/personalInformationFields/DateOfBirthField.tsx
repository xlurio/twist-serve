import {
  DatePicker,
} from '@mui/x-date-pickers';

import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

export default function DateOfBirthField() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DatePicker name="date_of_birth" label="Date of birth" />
    </LocalizationProvider>
  );
}
