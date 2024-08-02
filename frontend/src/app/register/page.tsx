'use client';
import {Button, Stack} from '@mui/material';
import CredentialFields from '@/components/register/CredentialFields';
import PersonalInformationFields from '@/components/register/PersonalInformationFields';
import PlaystyleFields from '@/components/register/PlaystyleFields';
import HometownFields from '@/components/register/HometownFields';
import {useRouter} from 'next/navigation';
import {useFormState} from 'react-dom';
import {registerFromFormAction} from '@/app/actions';
import {useCheckIfIsAuthenticatedEffect} from '@/lib/hooks';
import FormErrorAlert from '@/components/forms/FormErrorAlert';

export default function Register() {
  const router = useRouter();
  const [isAuthenticated, _] = useCheckIfIsAuthenticatedEffect();
  const [state, action] = useFormState(registerFromFormAction, {
    errorMessage: '',
  });

  if (isAuthenticated) {
    router.push('/');
  }

  return (
    <Stack>
      <h1>Register</h1>
      <form action={action}>
        <Stack>
          <CredentialFields />
          <PersonalInformationFields />
          <PlaystyleFields />
          <HometownFields />
        </Stack>
        <FormErrorAlert errorMessage={state.errorMessage} />
        <Button sx={{margin: '1em 0'}} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Stack>
  );
}
