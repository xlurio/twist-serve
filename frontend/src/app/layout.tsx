import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import type {Metadata, Viewport} from 'next';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../theme';
import CssBaseline from '@mui/material/CssBaseline';
import {Zoom} from '@mui/material';
import StoreProvider from './StoreProvider';

export const metadata: Metadata = {
  title: 'Tennis Tournaments',
  description: 'Check the next local tournaments',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AppRouterCacheProvider options={{enableCssLayer: true}}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Zoom in>
                <main>{children}</main>
              </Zoom>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
