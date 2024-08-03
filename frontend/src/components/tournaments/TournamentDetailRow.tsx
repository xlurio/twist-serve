import { Grid, Typography } from "@mui/material";

export default function TournamentDetailRow({key, value}: {key: string, value: string}): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid item xs={6}>
          <Typography variant="body1">{key}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">{value}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
