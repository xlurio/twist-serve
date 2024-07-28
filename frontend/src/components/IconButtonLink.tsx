import {IconButton, Link} from '@mui/material';
import {ReactNode} from 'react';

export default function IconButtonLink({
  href,
  ariaLabel,
  icon,
}: {
  href: string;
  ariaLabel: string;
  icon: ReactNode;
}): JSX.Element {
  return (
    <Link color="inherit" underline="none" variant="inherit" href={href}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label={ariaLabel}
      >
        {icon}
      </IconButton>
    </Link>
  );
}
