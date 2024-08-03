import TournamentDetailRow from '@/components/tournaments/TournamentDetailRow';
import TournamentRounds from '@/components/tournaments/TournamentRounds';
import {Button, Typography} from '@mui/material';

export default function TournamentDetail() {
  return (
    <>
      <h1>Adelaide International</h1>
      <Typography>2 September, 2024 - 16 September, 2024</Typography>
      <Button>Subscribe</Button>
      <h2>Tournament Details</h2>
      <TournamentDetailRow key="Location" value="Adelaide, Australia" />
      <TournamentDetailRow key="Surface" value="Hard" />
      <TournamentDetailRow key="Slots" value="28" />
      <h2>Matches</h2>
      <TournamentRounds />
    </>
  );
}
