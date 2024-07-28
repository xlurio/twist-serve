import {Grid, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchButton(): JSX.Element {
  return (
    <Grid
      xs={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      item
    >
      <IconButton size="large" color="inherit" aria-label="menu">
        <SearchIcon />
      </IconButton>
    </Grid>
  );
}
