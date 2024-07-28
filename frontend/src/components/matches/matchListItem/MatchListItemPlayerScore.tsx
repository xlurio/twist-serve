import {Grid, Typography} from '@mui/material';


export default function MatchListItemPlayerScore({
  player,
  score,
}: {
  player: string;
  score: number;
}): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={10}>
        <Typography variant="h6">{player}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{score}</Typography>
      </Grid>
    </Grid>
  );
}
