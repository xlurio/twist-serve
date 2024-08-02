'use client';
import ProfileMenu from './profileMenuController/ProfileMenu';
import OpenProfileMenuBtn from './profileMenuController/OpenProfileMenuBtn';
import {useProfileState} from '@/lib/hooks/navigationBar';

export default function ProfileMenuController(): JSX.Element {
  const {reducerState, handleProfileClick, handleCloseMenu, handleLogoutClick} =
    useProfileState();

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
