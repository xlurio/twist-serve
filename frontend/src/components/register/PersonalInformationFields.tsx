import {Stack} from '@mui/material';
import {ChangeEvent, Dispatch} from 'react';
import {makeDispatchHTMLInputChange} from '@/lib/services';
import NumberField from '@/components/forms/NumberField';
import FirstNameField from './personalInformationFields/FirstNameField';
import LastNameField from './personalInformationFields/LastNameField';
import DateOfBirthField from './personalInformationFields/DateOfBirthField';
import WeightField from './personalInformationFields/WeightField';
import AvatarField from './personalInformationFields/AvatarField';
import {
  RegisterReducerAction,
  RegisterReducerActionTypes,
} from '@/types/reducers';

function _makeHandleAvatarChangeCallback(
  dispatch: Dispatch<RegisterReducerAction>
) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      dispatch({
        type: RegisterReducerActionTypes.SET_AVATAR,
        newAvatar: event.target.files[0],
      });
    }
  };
}

export default function PersonalInformationFields({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}): JSX.Element {
  return (
    <Stack gap={1}>
      <h2>Personal Information</h2>
      <AvatarField onChange={_makeHandleAvatarChangeCallback(dispatch)} />
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
