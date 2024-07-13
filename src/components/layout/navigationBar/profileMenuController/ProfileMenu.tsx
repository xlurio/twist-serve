import {Menu, MenuItem, PopoverOrigin} from '@mui/material';
import {MouseEventHandler} from 'react';

/**
 * Make an object with the profile menu anchor origin
 */
function _makeAnchorOrigin(): PopoverOrigin {
  return {
    vertical: 'bottom',
    horizontal: 'left',
  };
}


/**
 * Menu with the user profile options
 */
export default function ProfileMenu({
  open,
  anchorEl,
  onClose,
  handleLogoutClick,
}: {
  open: boolean;
  anchorEl: Element | null;
  onClose: (event: Event, reason: 'backdropClick' | 'escapeKeyDown') => void;
  handleLogoutClick: MouseEventHandler<HTMLLIElement>;
}): JSX.Element {
  return (
    <Menu
      id="profile-menu"
      aria-labelledby="profile-button"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={_makeAnchorOrigin()}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>
  );
}
