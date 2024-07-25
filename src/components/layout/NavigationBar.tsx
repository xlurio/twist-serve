'use client';
import {AppBar, Button, Link, Toolbar, Typography} from '@mui/material';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import NavigationBarDrawer from './navigationBar/NavigationBarDrawer';
import ProfileMenuController from './navigationBar/ProfileMenuController';
import IconButtonLink from '../IconButtonLink';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Makes the authentication checker
 * @param setIsAuthenticated user authentication state setter
 */
function _useCheckIfIsAuthenticatedEffect(
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
): void {
  useEffect(() => {
    const isAuthenticated = Boolean(localStorage.getItem('username'));
    setIsAuthenticated(isAuthenticated);
  }, [setIsAuthenticated]);
}

/**
 * Constructs the user profile section of the navigation bar
 * @param isAuthenticated user authentication state
 * @param setIsAuthenticated user authentication state setter
 */
function _makeUserSection(
  isAuthenticated: boolean,
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
): JSX.Element {
  if (isAuthenticated) {
    return <ProfileMenuController setIsAuthenticated={setIsAuthenticated} />;
  }
  return (
    <Link color="inherit" underline="none" variant="inherit" href="/login/">
      <Button color="inherit">Login</Button>
    </Link>
  );
}

/**
 * Top navigation bar
 */
export default function NavigationBar(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  _useCheckIfIsAuthenticatedEffect(setIsAuthenticated);

  return (
    <AppBar position="static">
      <Toolbar>
        {isAuthenticated ? <NavigationBarDrawer /> : ''}
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          <Link color="inherit" underline="none" variant="inherit" href="/">
            Royal
          </Link>
        </Typography>
        <IconButtonLink
          href="/search/"
          ariaLabel="search"
          icon={<SearchIcon />}
        />
        {_makeUserSection(isAuthenticated, setIsAuthenticated)}
      </Toolbar>
    </AppBar>
  );
}
