'use client';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {
  useEffect,
  useRef,
  useState,
  SetStateAction,
  Dispatch,
  MutableRefObject,
} from 'react';
import RoundTabPanel from './tournamentRounds/RoundTabPanel';
import RoundTabs from './tournamentRounds/RoundTabs';
import { ListRoundsResponseDataResult } from '@/types/http/rounds';

function _useTournamentRounds(): [
  number,
  Dispatch<SetStateAction<number>>,
  MutableRefObject<
    Map<number, {round: HTMLDivElement; matches: HTMLDivElement[]}>
  >,
] {
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState(
    Number.parseInt(searchParams.get('tab') || '0')
  );
  const tabsRef = useRef<
    Map<number, {round: HTMLDivElement; matches: HTMLDivElement[]}>
  >(new Map());
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', currentTab.toString());
    router.push(pathname + '?' + params.toString());
  }, [currentTab]);

  return [currentTab, setCurrentTab, tabsRef];
}

export default function TournamentRounds(): JSX.Element {
  const [currentTab, setCurrentTab, tabsRef] = _useTournamentRounds();
  const rounds: ListRoundsResponseDataResult[] = [];

  return (
    <>
      <RoundTabs
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        ref={tabsRef}
      />
      {rounds.map((round, index) => (
        <RoundTabPanel
          key={round.id}
          currentTab={currentTab}
          index={index}
          matchRoundId={round.id}
        />
      ))}
    </>
  );
}
