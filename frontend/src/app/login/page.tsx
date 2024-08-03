'use client';
import {Button, Link, Stack} from '@mui/material';
import LoginFields from '@/components/login/LoginFields';
import {useRouter} from 'next/navigation';
import {loginFromFormAction} from '@/app/actions';
import {useFormState} from 'react-dom';
import {useEffect} from 'react';
import FormErrorAlert from '@/components/forms/FormErrorAlert';

export default function Login() {
  const router = useRouter();
  const [state, formAction] = useFormState(loginFromFormAction, {
    errorMessage: '',
  });

  useEffect(() => {
    router.prefetch('/');
  }, []);

  return (
    <form action={formAction}>
      <Stack gap={1}>
        <h2>Login</h2>
        <LoginFields />
        <FormErrorAlert errorMessage={state.errorMessage} />
        <Button sx={{margin: '1em 0'}} type="submit" variant="contained">
          Login
        </Button>
        <Link href="/register/">I don&apos;t have an account</Link>
      </Stack>
    </form>
  );
}
