import {
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {ReactNode} from 'react';


/**
 * Item of the Drawer menu
 */
export default function NavigationBarDrawerItem({
  href,
  primary,
  icon,
}: {
  href: string;
  primary: ReactNode;
  icon: ReactNode;
}): JSX.Element {
  return (
    <ListItem disablePadding>
      <Link
        color="inherit"
        underline="none"
        variant="inherit"
        href={href}
        sx={{width: '100%'}}
      >
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
}
