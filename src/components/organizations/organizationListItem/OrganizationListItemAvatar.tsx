import {Avatar, Grid} from '@mui/material';

/**
 * Renders the organization avatar
 */
export default function OrganizationListItemAvatar({
  avatar,
}: {
  avatar: string;
}): JSX.Element {
  return (
    <Grid
      item
      xs={2}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Avatar src={avatar} />
    </Grid>
  );
}
