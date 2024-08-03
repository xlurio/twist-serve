import {ListItem, ListItemButton, Slide, Stack, Typography} from '@mui/material';
import MatchListItemPlayerScore from './matchListItem/MatchListItemPlayerScore';
import { ListMatchResponseDataResultPlayer } from '@/types/http/matches';

export default function MatchListItem({
  player1,
  player2,
  date,
}: {
  player1:   ListMatchResponseDataResultPlayer;
  player2:   ListMatchResponseDataResultPlayer;
  date: string;
}): JSX.Element {
  return (
    <Slide direction="up" in>
      <ListItem disablePadding>
        <ListItemButton>
          <Stack sx={{width: '100%'}}>
            <Typography variant="caption">{date}</Typography>
            <MatchListItemPlayerScore player={player1} />
            <MatchListItemPlayerScore player={player2} />
          </Stack>
        </ListItemButton>
      </ListItem>
    </Slide>
  );
}
