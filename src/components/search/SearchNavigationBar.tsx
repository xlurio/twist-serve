import {Grid, TextField} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButtonLink from '../IconButtonLink';
import SearchButton from './searchNavigationBar/SearchButton';


/**
 * Navigation bar of the search page
 */
export default function SearchNavigationBar(): JSX.Element {
  return (
    <Grid container>
      <Grid
        xs={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        item
      >
        <IconButtonLink href="/" ariaLabel="home" icon={<ArrowBackIcon />} />
      </Grid>
      <Grid item xs>
        <TextField
          autoFocus
          margin="none"
          variant="filled"
          label="Search"
          name="search"
          id="search"
          sx={{width: '100%'}}
        />
      </Grid>
      <SearchButton />
    </Grid>
  );
}
