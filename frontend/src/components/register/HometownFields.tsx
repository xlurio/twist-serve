import {Stack} from '@mui/material';
import {Dispatch} from 'react';
import HometownCountry from './hometownFields/HometownCountry';
import HometownStateProvinceField from './hometownFields/HometownStateProvinceField';
import HometownCityField from './hometownFields/HometownCityField';
import {RegisterReducerAction} from '@/types/reducers';

export default function HometownFields({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}): JSX.Element {
  return (
    <Stack gap={1}>
      <h2>Hometown</h2>
      <HometownCountry dispatch={dispatch} />
      <HometownStateProvinceField dispatch={dispatch} />
      <HometownCityField dispatch={dispatch} />
    </Stack>
  );
}
