import {TextField} from '@mui/material';
import InternationalLocationFields from './locationFields/InternationalLocationFields';
import AddressFields from './locationFields/AddressFields';

export default function LocationFields(): JSX.Element {
  return (
    <>
      <InternationalLocationFields />
      <AddressFields />
      <TextField
        id="instalation"
        label="Instalation"
        name="instalation"
        variant="outlined"
        required
      />
    </>
  );
}
