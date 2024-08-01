import {Dispatch} from 'react';
import {
  DatePicker,
  DateValidationError,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';

import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {
  RegisterReducerAction,
  RegisterReducerActionTypes,
} from '@/types/reducers';

function _makeHandleDateOfBirthFieldChangeCallback(
  dispatch: Dispatch<RegisterReducerAction>
) {
  return (
    value: dayjs.Dayjs | null,
    _context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    dispatch({
      type: RegisterReducerActionTypes.SET_DATE_OF_BIRTH,
      newDateOfBirth: value,
    });
  };
}

export default function DateOfBirthField({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DatePicker
        name="date_of_birth"
        label="Date of birth"
        onChange={_makeHandleDateOfBirthFieldChangeCallback(dispatch)}
      />
    </LocalizationProvider>
  );
}
