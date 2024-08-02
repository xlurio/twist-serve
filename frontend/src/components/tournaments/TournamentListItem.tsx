'use client';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  useTheme,
  Slide,
} from '@mui/material';
import TournamentListItemBody from './tournamentListItem/TournamentListItemBody';

export default function TournamentListItem(props: {
  location: string;
  name: string;
  period: string;
  tournamentAvatar?: string;
}): JSX.Element {
  const theme = useTheme();

  return (
    <Slide direction="up" in>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar
              sx={{backgroundColor: theme.palette.common.white}}
              alt="tournament-badge"
              src={props.tournamentAvatar}
            ></Avatar>
          </ListItemAvatar>
          <TournamentListItemBody
            location={props.location}
            name={props.name}
            period={props.period}
          />
        </ListItemButton>
      </ListItem>
    </Slide>
  );
}
