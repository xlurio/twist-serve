'use client';
import {ListItem, ListItemText, ListItemAvatar, Avatar} from '@mui/material';
import theme from '@/theme';

/**
 * Component defining the items of the tournament list
 */
export default function TournamentListItem({
  name,
  location,
  period,
  tournamentAvatar,
}: {
  name: string;
  location: string;
  period: string;
  tournamentAvatar: string;
}): JSX.Element {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          sx={{backgroundColor: theme.palette.common.white}}
          alt="tournament-badge"
          src={tournamentAvatar}
        ></Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={`${location} | ${period}`} />
    </ListItem>
  );
}
