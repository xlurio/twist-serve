'use client';
import {Button, Container, Link, Stack, TextField} from '@mui/material';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import {useRouter} from 'next/navigation';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';


/**
 * Hook that makes the memoized version of the change event handler for the username
 * field
 */
function _useHandleUsernameChangeCallback(
  setUsername: Dispatch<SetStateAction<string>>
) {
  return useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );
}


/**
 * Hook that makes the memoized version of the submission even handler for the
 * authentication form
 */
function _useHandleFormSubmitCallback(
  username: string,
  router: AppRouterInstance
) {
  return useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if ((event.target as HTMLFormElement).reportValidity()) {
        localStorage.setItem('username', username);
        return router.push('/');
      }
    },
    [username, router]
  );
}


/**
 * Hook to manage the state of the user authentication form
 */
function _useLoginState() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  return {
    handleFormSubmit: _useHandleFormSubmitCallback(username, router),
    usernameTextField: (
      <TextField
        id="username"
        label="Username"
        name="username"
        variant="outlined"
        onChange={_useHandleUsernameChangeCallback(setUsername)}
        required
      />
    ),
  };
}


/**
 * User authentication form
 */
export default function Login() {
  const {handleFormSubmit, usernameTextField} = _useLoginState();

  return (
    <Container>
      <form method="post" onSubmit={handleFormSubmit}>
        <Stack gap={1}>
          <h2>Login</h2>
          {usernameTextField}
          <TextField
            id="password"
            label="Password"
            name="password"
            variant="outlined"
            type="password"
            required
          />
          <Button sx={{margin: '1em 0'}} type="submit" variant="contained">
            Login
          </Button>
          <Link href="/register/">I don&apos;t have an account</Link>
        </Stack>
      </form>
    </Container>
  );
}
