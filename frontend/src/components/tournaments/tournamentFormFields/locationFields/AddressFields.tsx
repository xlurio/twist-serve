import {TextField} from '@mui/material';
import MainAddressFields from './addressFields/MainAddressFields';

export default function AddressFields(): JSX.Element {
  return (
    <>
      <TextField
        id="neighborhood"
        label="Neighborhood"
        name="neighborhood"
        variant="outlined"
      />
      <MainAddressFields />
      <TextField
        id="complement"
        label="Complement"
        name="complement"
        variant="outlined"
      />
    </>
  );
}
