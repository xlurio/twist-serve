'use client';
import {RegisterReducerAction, RegisterReducerActionTypes} from '@/types';
import {Stack} from '@mui/material';
import {ChangeEvent, Dispatch, useCallback} from 'react';
import 'dayjs/locale/en';
import {makeDispatchHTMLInputChange} from '@/lib/services';
import NumberField from '@/components/forms/NumberField';
import FirstNameField from './personalInformationFields/FirstNameField';
import LastNameField from './personalInformationFields/LastNameField';
import DateOfBirthField from './personalInformationFields/DateOfBirthField';
import WeightField from './personalInformationFields/WeightField';
import AvatarField from './personalInformationFields/AvatarField';

function _useHandleAvatarChangeCallback(
  dispatch: Dispatch<RegisterReducerAction>
) {
  return useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        dispatch({
          type: RegisterReducerActionTypes.SET_AVATAR,
          newAvatar: event.target.files[0],
        });
      }
    },
    [dispatch]
  );
}

export default function PersonalInformationFields({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}): JSX.Element {
  return (
    <Stack>
      <h2>Personal Information</h2>
      <AvatarField onChange={_useHandleAvatarChangeCallback(dispatch)} />
      <FirstNameField dispatch={dispatch} />
      <LastNameField dispatch={dispatch} />
      <DateOfBirthField dispatch={dispatch} />
      <WeightField dispatch={dispatch} />
      <NumberField
        id="height"
        label="Height (cm)"
        name="height"
        variant="outlined"
        onChange={makeDispatchHTMLInputChange(
          dispatch,
          RegisterReducerActionTypes.SET_HEIGHT,
          'newHeight'
        )}
        required
      />
    </Stack>
  );
}
