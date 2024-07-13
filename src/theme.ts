'use client';
import {Roboto as configRoboto} from 'next/font/google';
import {createTheme} from '@mui/material/styles';

const roboto = configRoboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: 'dark',
  },
});

export default theme;
