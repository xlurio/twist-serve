import {Box, Drawer, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useCallback, useState, MouseEvent} from 'react';
import NavigationBarDrawerMenu from './navigationBarDrawer/NavigationBarDrawerList';

function _useNavigationBarDrawerState(): {
  shouldShowDrawer: boolean;
  handleMenuBtnClick: (_event: MouseEvent<HTMLButtonElement>) => void;
  handleCloseSidebar: () => void;
} {
  const [shouldShowDrawer, setShouldShowDrawer] = useState(false);

  return {
    shouldShowDrawer,
    handleMenuBtnClick: useCallback(
      (_event: MouseEvent<HTMLButtonElement>) => {
        setShouldShowDrawer(true);
      },
      [setShouldShowDrawer]
    ),
    handleCloseSidebar: useCallback(() => {
      if (shouldShowDrawer) {
        setShouldShowDrawer(false);
      }
    }, [shouldShowDrawer]),
  };
}

export default function NavigationBarDrawer(): JSX.Element {
  const {shouldShowDrawer, handleMenuBtnClick, handleCloseSidebar} =
    _useNavigationBarDrawerState();

  return (
    <div>
      <IconButton
        onClick={handleMenuBtnClick}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={shouldShowDrawer} onClose={handleCloseSidebar}>
        <Box sx={{width: 250}} role="presentation" onClick={handleCloseSidebar}>
          <NavigationBarDrawerMenu />
        </Box>
      </Drawer>
    </div>
  );
}
