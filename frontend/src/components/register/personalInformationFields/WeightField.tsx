import {RegisterReducerAction, RegisterReducerActionTypes} from '@/types';
import {Dispatch} from 'react';
import 'dayjs/locale/en';
import {makeDispatchHTMLInputChange} from '@/lib/services';
import NumberField from '@/components/forms/NumberField';

export default function WeightField({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}): JSX.Element {
  return (
    <NumberField
      id="weight"
      label="Weight (kg)"
      name="weight"
      variant="outlined"
      onChange={makeDispatchHTMLInputChange(
        dispatch,
        RegisterReducerActionTypes.SET_WEIGHT,
        'newWeight'
      )}
      required
    />
  );
}
