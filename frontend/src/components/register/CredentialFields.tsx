import {Stack} from '@mui/material';
import PasswordField from '../forms/PasswordField';
import EmailField from '../forms/EmailField';

export default function CredentialFields() {
  return (
    <Stack gap={1}>
      <h2>Credentials</h2>
      <EmailField />
      <PasswordField />
      <PasswordField
        id="password2"
        label="Repeat the password"
        name="password2"
      />
    </Stack>
  );
}
