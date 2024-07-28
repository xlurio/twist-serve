import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import type {Metadata, Viewport} from 'next';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../theme';
import CssBaseline from '@mui/material/CssBaseline';
import {Zoom} from '@mui/material';

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
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <Zoom in>
                <main>{children}</main>
              </Zoom>
            </CssBaseline>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
