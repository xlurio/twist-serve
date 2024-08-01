import {configureStore} from '@reduxjs/toolkit';
import {snackBarSlice} from './features/snackBarSlice';

export const makeStore = () => {
  return configureStore({
    reducer: snackBarSlice.reducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
