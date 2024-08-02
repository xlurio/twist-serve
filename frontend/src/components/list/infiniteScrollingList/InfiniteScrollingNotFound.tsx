import {Fade} from '@mui/material';

export default function InfiniteScrollingNotFound({
  noItemsWereFound,
  hasNoMore,
  itemVerboseName,
}: {
  noItemsWereFound: boolean;
  hasNoMore: boolean;
  itemVerboseName: string;
}): JSX.Element {
  return (
    <div style={{position: 'relative'}}>
      <Fade in={noItemsWereFound && hasNoMore}>
        <h2 style={{position: 'absolute'}}>No {itemVerboseName} was found</h2>
      </Fade>
    </div>
  );
}
