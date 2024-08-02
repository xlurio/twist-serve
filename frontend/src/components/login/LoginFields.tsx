import {FormControl, Stack} from '@mui/material';
import PasswordField from '@/components/forms/PasswordField';
import EmailField from '@/components/forms/EmailField';
import Checkbox from '@/components/forms/Checkbox';

export default function LoginFields(): JSX.Element {
  return (
    <FormControl>
      <Stack gap={1}>
        <EmailField />
        <PasswordField />
        <Checkbox label="Remember me" />
      </Stack>
    </FormControl>
  );
}
