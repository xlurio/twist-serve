import {Avatar, IconButton} from '@mui/material';
import {MouseEventHandler} from 'react';
import {Booleanish} from '@/types';

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
