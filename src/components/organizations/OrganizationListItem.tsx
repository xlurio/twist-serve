import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import {Key} from 'react';
import OrganizationListItemAvatar from './organizationListItem/OrganizationListItemAvatar';

/**
 * Renders an item for a organizations list
 */
export default function OrganizationListItem({
  key,
  avatar,
  name,
}: {
  key?: Key;
  avatar: string;
  name: string;
}): JSX.Element {
  return (
    <ListItem key={key} disablePadding>
      <ListItemButton>
        <ListItemText
          primary={
            <Grid container columnGap={1}>
              <OrganizationListItemAvatar avatar={avatar} />
              <Grid item xs={9} style={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="h6">{name}</Typography>
              </Grid>
            </Grid>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
