import {RegisterReducerAction} from '@/types';
import {Stack} from '@mui/material';
import {Dispatch} from 'react';
import 'dayjs/locale/en';
import BestHandField from './playstyleFields/BestHandField';
import BackhandField from './playstyleFields/BackhandField';

export default function PlaystyleFields({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}): JSX.Element {
  return (
    <Stack>
      <h2>Playstyle</h2>
      <BestHandField dispatch={dispatch} />
      <BackhandField dispatch={dispatch} />
    </Stack>
  );
}
