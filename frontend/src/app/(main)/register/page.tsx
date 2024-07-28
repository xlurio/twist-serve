'use client';
import {Button, Container, Stack, Typography} from '@mui/material';
import theme from '@/theme';
import 'dayjs/locale/en';
import CredentialFields from '@/components/register/CredentialFields';
import PersonalInformationFields from '@/components/register/PersonalInformationFields';
import PlaystyleFields from '@/components/register/PlaystyleFields';
import HometownFields from '@/components/register/HometownFields';
import RegisterFormContainer from '@/components/register/RegisterFormContainer';
import {useRegisterState} from '@/lib/hooks/registerForm';

export default function Register() {
  const {state, dispatch, router, errorMessage} = useRegisterState();

  return (
    <Container>
      <Stack gap={1}>
        <h1>Register</h1>
        <RegisterFormContainer
          state={state}
          dispatch={dispatch}
          router={router}
        >
          <Stack gap={1}>
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
    </Container>
  );
}
