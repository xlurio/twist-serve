import {
  Button,
  Container,
  Stack,
  TextField,
  TextFieldVariants,
} from '@mui/material';

/**
 * Makes the data needed to render the username field
 */
function makeUsernameFieldData(): {
  id: string;
  label: string;
  name: string;
  variant: TextFieldVariants;
  type: string;
} {
  return {
    id: 'username',
    label: 'Username',
    name: 'username',
    variant: 'outlined',
    type: 'text',
  };
}

/**
 * Makes the data needed to render the email field
 */
function makeEmailFieldData(): {
  id: string;
  label: string;
  name: string;
  variant: TextFieldVariants;
  type: string;
} {
  return {
    id: 'email',
    label: 'Email',
    name: 'email',
    variant: 'outlined',
    type: 'email',
  };
}

/**
 * Makes the dataset needed to render player registration form fields
 */
function makeRegisterFormFieldsDataset(): {
  id: string;
  label: string;
  name: string;
  variant: TextFieldVariants;
  type: string;
}[] {
  return [
    makeUsernameFieldData(),
    makeEmailFieldData(),
    {
      id: 'password',
      label: 'Password',
      name: 'password',
      variant: 'outlined',
      type: 'password',
    },
    {
      id: 'password2',
      label: 'Repeat password',
      name: 'password2',
      variant: 'outlined',
      type: 'password',
    },
  ];
}

/**
 * Player registration form
 */
export default function Register() {
  return (
    <Container>
      <form method="post">
        <Stack gap={1}>
          <h2>Register</h2>
          {makeRegisterFormFieldsDataset().map(fieldData => (
            <TextField
              id={fieldData.id}
              key={fieldData.id}
              label={fieldData.label}
              name={fieldData.name}
              variant={fieldData.variant}
              type={fieldData.type}
            />
          ))}
          <Button sx={{margin: '1em 0'}} type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
