import {TextField, TextFieldProps, TextFieldVariants} from '@mui/material';
import {KeyboardEvent} from 'react';

function _makeNumberFieldKeyDownHandler() {
  return (event: KeyboardEvent<HTMLDivElement>) => {
    if (isFinite(Number.parseInt(event.key))) {
      return;
    }

    switch (event.key) {
      case 'Backspace':
        return;
      case 'Tab':
        return;
      default:
        event.preventDefault();
        return false;
    }
  };
}

export default function NumberField<Variant extends TextFieldVariants>(
  props: {
    variant?: Variant;
  } & Omit<TextFieldProps, 'variant'>
): JSX.Element {
  return <TextField {...props} onKeyDown={_makeNumberFieldKeyDownHandler()} />;
}
