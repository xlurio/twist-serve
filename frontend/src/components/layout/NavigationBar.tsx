import {AppBar, Link, Toolbar, Typography} from '@mui/material';
import NavigationBarDrawer from './navigationBar/NavigationBarDrawer';
import UserToolbarSection from './navigationBar/UserToolbarSection';
import {cookies} from 'next/headers';

export default function NavigationBar(): JSX.Element {
  const isAuthenticated = Boolean(cookies().get('token'));

  return (
    <AppBar position="sticky">
      <Toolbar>
        {isAuthenticated ? <NavigationBarDrawer /> : ''}
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          <Link color="inherit" underline="none" variant="inherit" href="/">
            Royal
          </Link>
        </Typography>
        <UserToolbarSection isAuthenticated={isAuthenticated} />
      </Toolbar>
    </AppBar>
  );
}
