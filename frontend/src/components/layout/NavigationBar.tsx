'use client';
import {AppBar, Link, Toolbar, Typography} from '@mui/material';
import NavigationBarDrawer from './navigationBar/NavigationBarDrawer';
import IconButtonLink from '../IconButtonLink';
import SearchIcon from '@mui/icons-material/Search';
import UserToolbarSection from './navigationBar/UserToolbarSection';
import {useCheckIfIsAuthenticatedEffect} from '@/lib/hooks';

export default function NavigationBar(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] =
    useCheckIfIsAuthenticatedEffect();

  return (
    <AppBar position="sticky">
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
        <UserToolbarSection
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </Toolbar>
    </AppBar>
  );
}
