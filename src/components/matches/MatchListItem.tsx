import {
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import MatchListItemPlayerScore from './matchListItem/MatchListItemPlayerScore';

/**
 * Component representing the items in the player's matches list
 */
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
        <ListItemText
          primary={
            <Stack>
              <Typography variant="caption">{date}</Typography>
              <MatchListItemPlayerScore player={player1} score={player1Score} />
              <MatchListItemPlayerScore player={player2} score={player2Score} />
            </Stack>
          }
        ></ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
