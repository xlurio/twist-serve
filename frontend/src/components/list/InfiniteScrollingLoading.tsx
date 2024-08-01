import {Box, CircularProgress, ListItem, ListItemText} from '@mui/material';
import {ForwardedRef, forwardRef} from 'react';

const InfiniteScrollingLoading = forwardRef(function InfiniteScrollingLoading(
  {hasMore}: {hasMore: boolean},
  ref: ForwardedRef<HTMLLIElement | null>
): JSX.Element {
  return (
    <ListItem ref={ref}>
      {hasMore ? (
        <ListItemText
          primary={
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <CircularProgress />
            </Box>
          }
        />
      ) : (
        ''
      )}
    </ListItem>
  );
});

export default InfiniteScrollingLoading;
