'use client';
import {createTournamentFromFormAction} from '@/app/actions';
import FormErrorAlert from '@/components/forms/FormErrorAlert';
import CreateTournamentFormFields from '@/components/tournaments/CreateTournamentFormFields';
import {Button, Stack} from '@mui/material';
import {useFormState} from 'react-dom';

export default function CreateTournament(): JSX.Element {
  const [state, action] = useFormState(createTournamentFromFormAction, {
    errorMessage: '',
  });

  return (
    <Stack>
      <h1>Create tournament</h1>
      <form action={action}>
        <CreateTournamentFormFields />
        <FormErrorAlert errorMessage={state.errorMessage} />
        <Button sx={{margin: '1em 0'}} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Stack>
  );
}
