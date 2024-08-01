'use client';
import {Button, Stack, Typography, useTheme} from '@mui/material';
import CredentialFields from '@/components/register/CredentialFields';
import PersonalInformationFields from '@/components/register/PersonalInformationFields';
import PlaystyleFields from '@/components/register/PlaystyleFields';
import HometownFields from '@/components/register/HometownFields';
import RegisterFormContainer from '@/components/register/RegisterFormContainer';
import {useRegisterState} from '@/lib/hooks/registerForm';

export default function Register() {
  const {state, dispatch, router, errorMessage} = useRegisterState();
  const theme = useTheme();

  return (
      <Stack>
        <h1>Register</h1>
        <RegisterFormContainer
          state={state}
          dispatch={dispatch}
          router={router}
        >
          <Stack>
            <CredentialFields dispatch={dispatch} />
            <PersonalInformationFields dispatch={dispatch} />
            <PlaystyleFields dispatch={dispatch} />
            <HometownFields dispatch={dispatch} />
          </Stack>
          <Typography sx={{color: theme.palette.error.main}}>
            {errorMessage}
          </Typography>
          <Button sx={{margin: '1em 0'}} type="submit" variant="contained">
            Submit
          </Button>
        </RegisterFormContainer>
      </Stack>
  );
}
