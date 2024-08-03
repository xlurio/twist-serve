import {Box, Tabs} from '@mui/material';
import RoundTab from './RoundTab';
import {Dispatch, ForwardedRef, forwardRef, SetStateAction} from 'react';
import { ListRoundsResponseDataResult } from '@/types/http/rounds';

interface RoundTabsProps {
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}

type RoundTabsForwardedRef = ForwardedRef<
  Map<number, {round: HTMLDivElement; matches: HTMLDivElement[]}>
>;

const RoundTabs = forwardRef(function RoundTabs(
  props: RoundTabsProps,
  ref: RoundTabsForwardedRef
): JSX.Element {
  const rounds: ListRoundsResponseDataResult[] = [];

  return (
    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
      <Tabs
        value={props.currentTab}
        onChange={(_: React.SyntheticEvent, newValue: number) =>
          props.setCurrentTab(newValue)
        }
        variant="scrollable"
        scrollButtons="auto"
        aria-label="basic tabs example"
      >
        {rounds.map((round, index) => (
          <RoundTab key={round.id} ref={ref} label={round.name} index={index} />
        ))}
      </Tabs>
    </Box>
  );
});

export default RoundTabs;
