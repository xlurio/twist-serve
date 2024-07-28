import {Button, Grid, styled} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ChangeEventHandler } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function AvatarField({
  onChange,
}: {
  onChange?: ChangeEventHandler<HTMLInputElement>;
}): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={6}>
        <label htmlFor="avatar">Avatar:</label>
      </Grid>
      <Grid item xs={6} sx={{display: 'flex', justifyContent: 'end'}}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput id="avatar" onChange={onChange} type="file" />
        </Button>
      </Grid>
    </Grid>
  );
}
