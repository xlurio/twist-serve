import {Stack} from '@mui/material';
import {Dispatch} from 'react';

import BestHandField from './playstyleFields/BestHandField';
import BackhandField from './playstyleFields/BackhandField';
import { RegisterReducerAction } from '@/types/reducers';

export default function PlaystyleFields({
  dispatch,
}: {
  dispatch: Dispatch<RegisterReducerAction>;
}): JSX.Element {
  return (
    <Stack gap={1}>
      <h2>Playstyle</h2>
      <BestHandField dispatch={dispatch} />
      <BackhandField dispatch={dispatch} />
    </Stack>
  );
}
