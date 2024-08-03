import {Tab} from '@mui/material';
import {ForwardedRef, forwardRef} from 'react';

const RoundTab = forwardRef(function RoundTab(
  {label, index}: {label: string; index: number},
  ref: ForwardedRef<
    Map<number, {round: HTMLDivElement; matches: HTMLDivElement[]}>
  >
) {
  return (
    <Tab
      ref={ref as ForwardedRef<HTMLDivElement>}
      label={label}
      id={`round-tab-${index}`}
      aria-controls={`round-tabpanel-${index}`}
    />
  );
});

export default RoundTab;
