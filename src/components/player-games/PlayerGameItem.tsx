import {ListItem, ListItemText} from '@mui/material';

/**
 * Component representing the items in the player's matches list
 */
export default function PlayerGameItem({
  player1,
  player1Score,
  player2,
  player2Score,
  date,
}: {
  player1: string;
  player1Score: number;
  player2: string;
  player2Score: number;
  date: string;
}): JSX.Element {
  return (
    <ListItem>
      <ListItemText
        primary={`${player1} ${player1Score} x ${player2Score} ${player2}`}
        secondary={date}
      ></ListItemText>
    </ListItem>
  );
}
