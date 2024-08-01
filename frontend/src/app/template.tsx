'use client';
import {Alert, Snackbar} from '@mui/material';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {setMessage} from '@/lib/features/snackBarSlice';
import {useCallback} from 'react';

export default function Template({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const snackBarMessage = useAppSelector(state => state.message);
  const dispatch = useAppDispatch();
  const handleClose = useCallback(() => dispatch(setMessage('')), [dispatch]);

  return (
    <>
      {children}
      <Snackbar
        open={Boolean(snackBarMessage)}
        autoHideDuration={5000}
        onClose={handleClose}
        onClick={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{width: '100%'}}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
