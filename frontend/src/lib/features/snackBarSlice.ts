import {createSlice} from '@reduxjs/toolkit';

export const snackBarSlice = createSlice({
  name: 'snackBar',
  initialState: {
    message: '',
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {setMessage} = snackBarSlice.actions;
