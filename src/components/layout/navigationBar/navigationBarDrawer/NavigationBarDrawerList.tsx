import {List, ListItem, Typography} from '@mui/material';
import NavigationBarDrawerItem from './navigationBarDrawerList/NavigationBarDrawerItem';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BusinessIcon from '@mui/icons-material/Business';


/**
 * Navigation drawer menu
 */
export default function NavigationBarDrawerMenu(): JSX.Element {
  return (
    <List>
      <ListItem>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          Royal
        </Typography>
      </ListItem>
      <NavigationBarDrawerItem
        href="/my-matches/"
        primary="My Matches"
        icon={<SportsTennisIcon />}
      />
      <NavigationBarDrawerItem
        href="/my-tournaments/"
        primary="My Tournaments"
        icon={<EmojiEventsIcon />}
      />
      <NavigationBarDrawerItem
        href="/my-organizations/"
        primary="My Organizations"
        icon={<BusinessIcon />}
      />
    </List>
  );
}
