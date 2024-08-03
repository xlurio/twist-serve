import {
  DatePicker,
  DatePickerProps,
  PickerValidDate,
} from '@mui/x-date-pickers';

import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

export default function DatePickerField(
  props: DatePickerProps<PickerValidDate> & React.RefAttributes<HTMLDivElement>
) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DatePicker {...props} />
    </LocalizationProvider>
  );
}
