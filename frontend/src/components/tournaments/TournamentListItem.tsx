'use client'
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemButton,
} from '@mui/material';
import theme from '@/theme';

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
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar
            sx={{backgroundColor: theme.palette.common.white}}
            alt="tournament-badge"
            src={tournamentAvatar}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={`${location} | ${period}`} />
      </ListItemButton>
    </ListItem>
  );
}
