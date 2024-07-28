import {RegisterReducerAction} from '@/types';
import {Stack} from '@mui/material';
import {Dispatch} from 'react';
import 'dayjs/locale/en';
import HometownCountry from './hometownFields/HometownCountry';
import HometownStateProvinceField from './hometownFields/HometownStateProvinceField';
import HometownCityField from './hometownFields/HometownCityField';

export default function HometownFields({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}): JSX.Element {
  return (
    <Stack>
      <h2>Hometown</h2>
      <HometownCountry dispatch={dispatch} />
      <HometownStateProvinceField dispatch={dispatch} />
      <HometownCityField dispatch={dispatch} />
    </Stack>
  );
}
