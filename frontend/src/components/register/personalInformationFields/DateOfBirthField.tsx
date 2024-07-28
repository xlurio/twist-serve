import {RegisterReducerAction, RegisterReducerActionTypes} from '@/types';
import {Dispatch, useCallback} from 'react';
import {
  DatePicker,
  DateValidationError,
  PickerChangeHandlerContext,
  PickerValidDate,
} from '@mui/x-date-pickers';
import 'dayjs/locale/en';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function _useHandleDateOfBirthFieldChangeCallback(
  dispatch: Dispatch<RegisterReducerAction>
) {
  return useCallback(
    (
      value: PickerValidDate,
      _context: PickerChangeHandlerContext<DateValidationError>
    ) => {
      dispatch({
        type: RegisterReducerActionTypes.SET_DATE_OF_BIRTH,
        newDateOfBirth: value,
      });
    },
    [dispatch]
  );
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
        onChange={
          _useHandleDateOfBirthFieldChangeCallback(dispatch) as (
            value: dayjs.Dayjs | null,
            context: PickerChangeHandlerContext<DateValidationError>
          ) => void
        }
      />
    </LocalizationProvider>
  );
}
