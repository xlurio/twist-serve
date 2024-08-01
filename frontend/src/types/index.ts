import {Dispatch, ThunkDispatch, UnknownAction} from '@reduxjs/toolkit';

export type Booleanish = boolean | 'true' | 'false';

export type CustomThunkDispatch = ThunkDispatch<
  {
    message: string;
  },
  undefined,
  UnknownAction
> &
  Dispatch<UnknownAction>;
