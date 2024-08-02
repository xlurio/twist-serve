import {Button, Link} from '@mui/material';
import ProfileMenuController from './ProfileMenuController';

export default function UserToolbarSection({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}): JSX.Element {
  if (isAuthenticated) {
    return <ProfileMenuController />;
  }
  return (
    <Link color="inherit" underline="none" variant="inherit" href="/login/">
      <Button color="inherit">Login</Button>
    </Link>
  );
}
