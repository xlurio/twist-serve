import MatchListItem from '@/components/matches/MatchListItem';
import {Container, List, Stack} from '@mui/material';

const DUMMY_DATA = [
  {
    id: 1,
    player1: 'Carlos Alcaraz',
    player1Score: 3,
    player2Score: 0,
    player2: 'Novak Djokovic',
    date: '14/07/24',
  },
  {
    id: 2,
    player1: 'Lorenzo Musetti',
    player1Score: 0,
    player2Score: 3,
    player2: 'Novak Djokovic',
    date: '12/07/24',
  },
  {
    id: 3,
    player1: 'Alexei Popyrin',
    player1Score: 1,
    player2Score: 3,
    player2: 'Novak Djokovic',
    date: '06/07/24',
  },
];

export default function PlayerMatches() {
  return (
    <Container>
      <Stack>
        <h1>My Games</h1>
        <List>
          {DUMMY_DATA.map(matchData => (
            <MatchListItem
              key={matchData.id}
              player1={matchData.player1}
              player1Score={matchData.player1Score}
              player2Score={matchData.player2Score}
              player2={matchData.player2}
              date={matchData.date}
            />
          ))}
        </List>
      </Stack>
    </Container>
  );
}
