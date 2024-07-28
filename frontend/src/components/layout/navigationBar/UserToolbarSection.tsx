import {Button, Link} from '@mui/material';
import ProfileMenuController from './ProfileMenuController';
import { Dispatch, SetStateAction } from 'react';

export default function UserToolbarSection({
  isAuthenticated,
  setIsAuthenticated,
}: {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  if (isAuthenticated) {
    return <ProfileMenuController setIsAuthenticated={setIsAuthenticated} />;
  }
  return (
    <Link color="inherit" underline="none" variant="inherit" href="/login/">
      <Button color="inherit">Login</Button>
    </Link>
  );
}
