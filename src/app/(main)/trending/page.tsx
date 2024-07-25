import {Container, List, Stack} from '@mui/material';
import TournamentListItem from '@/components/tournaments/TournamentListItem';

const DUMMY_DATA = [
  {
    id: 1,
    name: 'United Cup',
    location: 'Perth-Sydney, Australia',
    period: '29 December, 2023 - 7 January, 2024',
    tournamentAvatar:
      'https://www.atptour.com/assets/atpwt/images/tournament/badges/categorystamps_unitedcup.png',
  },
  {
    id: 2,
    name: 'Brisbane International presented by Evie',
    location: 'Brisbane, Australia',
    period: '31 December, 2023 - 7 January, 2024',
    tournamentAvatar:
      'https://www.atptour.com/assets/atpwt/images/tournament/badges/categorystamps_250.png',
  },
  {
    id: 3,
    name: 'Bank of China Hong Kong Tennis Open',
    location: 'Hong Kong, China',
    period: '1 - 7 January, 2024',
    tournamentAvatar:
      'https://www.atptour.com/assets/atpwt/images/tournament/badges/categorystamps_250.png',
  },
];

/**
 * Trending tournaments list page
 */
export default function Trending(): JSX.Element {
  return (
    <Container>
      <Stack>
        <h1>Trending Tournaments</h1>
        <List>
          {DUMMY_DATA.map(tournamentData => (
            <TournamentListItem
              key={tournamentData.id}
              name={tournamentData.name}
              location={tournamentData.location}
              period={tournamentData.period}
              tournamentAvatar={tournamentData.tournamentAvatar}
            />
          ))}
        </List>
      </Stack>
    </Container>
  );
}
