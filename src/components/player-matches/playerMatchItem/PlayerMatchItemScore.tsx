import {Grid, Typography} from '@mui/material';


/**
 * Component that renders the score of one player or double
 */
export default function PlayerMatchItemScore({
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
