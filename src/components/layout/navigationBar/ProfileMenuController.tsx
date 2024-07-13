import {
  Dispatch,
  SetStateAction,
} from 'react';
import ProfileMenu from './profileMenuController/ProfileMenu';
import OpenProfileMenuBtn from './profileMenuController/OpenProfileMenuBtn';
import { useProfileState } from '@/lib/hooks';

/**
 * Component the controls the user profile menu at the navigation bar
 */
export default function ProfileMenuController({
  setIsAuthenticated,
}: {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const {reducerState, handleProfileClick, handleCloseMenu, handleLogoutClick} =
    useProfileState(setIsAuthenticated);

  return (
    <div>
      <OpenProfileMenuBtn
        ariaControls={
          reducerState.shouldShowProfileMenu ? 'profile-menu' : undefined
        }
        ariaExpanded={reducerState.shouldShowProfileMenu ? 'true' : undefined}
        onClick={handleProfileClick}
      />
      <ProfileMenu
        open={reducerState.shouldShowProfileMenu}
        anchorEl={reducerState.profileMenuAnchorElement}
        onClose={handleCloseMenu}
        handleLogoutClick={handleLogoutClick}
      />
    </div>
  );
}
