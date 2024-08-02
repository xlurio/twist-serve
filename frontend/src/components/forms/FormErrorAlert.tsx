import {Alert} from '@mui/material';
import {Fragment} from 'react';

export default function FormErrorAlert({
  errorMessage,
}: {
  errorMessage: string;
}): JSX.Element {
  return errorMessage ? (
    <Alert severity="error">{errorMessage}</Alert>
  ) : (
    <Fragment />
  );
}
