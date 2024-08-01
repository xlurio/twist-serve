import {Grid, Typography} from '@mui/material';

export default function TournamentListItemBody({
  location,
  name,
  period,
}: {
  location: string;
  period: string;
  name: string;
}): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">{name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{location}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{period}</Typography>
      </Grid>
    </Grid>
  );
}
