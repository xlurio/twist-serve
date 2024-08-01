import {
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import MatchListItemPlayerScore from './matchListItem/MatchListItemPlayerScore';

export default function MatchListItem({
  player1,
  player1Score,
  player2,
  player2Score,
  date,
}: {
  player1: string;
  player1Score: number;
  player2: string;
  player2Score: number;
  date: string;
}): JSX.Element {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Stack sx={{width: '100%'}}>
          <Typography variant="caption">{date}</Typography>
          <MatchListItemPlayerScore player={player1} score={player1Score} />
          <MatchListItemPlayerScore player={player2} score={player2Score} />
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
