import { ListMatchResponseDataResultPlayer } from '@/types/http/matches';
import {Grid, Typography} from '@mui/material';

export default function MatchListItemPlayerScore({
  player,
}: {
  player: ListMatchResponseDataResultPlayer;
}): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={10}>
        <Typography variant="h6">
          {player.name || player.previous_match?.toString() || ''}
        </Typography>
      </Grid>
      <Grid item xs={2} sx={{display: 'flex', alignItems: 'center'}}>
        <Typography>{player.sets_won}</Typography>
      </Grid>
    </Grid>
  );
}
