import {Avatar, IconButton} from '@mui/material';
import {MouseEventHandler} from 'react';
import {Booleanish} from '@/types';

/**
 * Button to open the use profile menu at the navigation bar
 */
export default function OpenProfileMenuBtn({
  ariaControls,
  ariaExpanded,
  onClick,
}: {
  ariaControls: string | undefined;
  ariaExpanded: Booleanish | undefined;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <IconButton
      id="profile-button"
      aria-controls={ariaControls}
      aria-haspopup="true"
      aria-expanded={ariaExpanded}
      onClick={onClick}
    >
      <Avatar />
    </IconButton>
  );
}
