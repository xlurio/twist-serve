'use client';
import {Fade, List, Stack} from '@mui/material';
import TournamentListItem from '@/components/tournaments/TournamentListItem';
import dayjs from 'dayjs';
import {useAppDispatch} from '@/lib/hooks';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {ListTournamentsResponseDataResult} from '@/types/http';
import {triggerSnackBarOnRequestError} from '@/lib/services/http';
import {CustomThunkDispatch} from '@/types';
import {cachedListTournaments} from '@/lib/services/http/tournaments';

function _useFetchTournamentsCallback(
  setTournaments: Dispatch<SetStateAction<ListTournamentsResponseDataResult[]>>
) {
  return async () => {
    const tournamentsData = await cachedListTournaments({
      ordering: '-num_of_subscriptions',
      page_size: 5,
      start_date__gte: dayjs(Date()).format('YYYY-MM-DD'),
    });
    setTournaments(tournamentsData.results);
  };
}

function _useFetchTournamentsOrSnackBarCallback({
  setTournaments,
  dispatch,
}: {
  setTournaments: Dispatch<SetStateAction<ListTournamentsResponseDataResult[]>>;
  dispatch: CustomThunkDispatch;
}) {
  return () => {
    triggerSnackBarOnRequestError(
      _useFetchTournamentsCallback(setTournaments),
      dispatch
    );
  };
}

function useTrendingState() {
  const dispatch = useAppDispatch();
  const [tournaments, setTournaments] = useState<
    ListTournamentsResponseDataResult[]
  >([]);

  useEffect(() => {
    const timeout = setTimeout(
      _useFetchTournamentsOrSnackBarCallback({setTournaments, dispatch}),
      200
    );
    return () => clearTimeout(timeout);
  }, []);

  return tournaments;
}

export default function Trending(): JSX.Element {
  const tournaments = useTrendingState();
  const tournamentsWereFound = tournaments.length > 0;

  return (
    <Stack>
      <h1>Trending Tournaments</h1>
      <div style={{position: 'relative'}}>
        <Fade in={!tournamentsWereFound}>
          <h2 style={{position: 'absolute'}}>No tournament was found</h2>
        </Fade>
      </div>
      <List>
        {tournaments.map(tournamentData => (
          <TournamentListItem
            key={tournamentData.id}
            name={tournamentData.name}
            location={`${tournamentData.city}, ${tournamentData.country}`}
            period={`${tournamentData.start_date} - ${tournamentData.end_date}`}
            tournamentAvatar={tournamentData.avatar || undefined}
          />
        ))}
      </List>
    </Stack>
  );
}
