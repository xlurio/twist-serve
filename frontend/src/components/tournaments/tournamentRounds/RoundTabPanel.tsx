'use client'
import MatchInfiniteScrollList from '@/components/matches/MatchInfiniteScrollList';
import {cachedListMatches} from '@/lib/services/http/matches';
import {Box} from '@mui/material';

export default function RoundTabPanel({
  currentTab,
  index,
  matchRoundId,
}: {
  currentTab: number;
  index: number;
  matchRoundId: number;
}): JSX.Element {
  return (
    <div
      role="tabpanel"
      hidden={currentTab !== index}
      id={`round-tabpanel-${index}`}
      aria-labelledby={`round-tab-${index}`}
    >
      {currentTab === index && (
        <Box sx={{p: 3}}>
          <MatchInfiniteScrollList
            getPageItems={() => cachedListMatches({match_round: matchRoundId})}
          />
        </Box>
      )}
    </div>
  );
}
