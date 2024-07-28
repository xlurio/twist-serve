import NavigationBar from '@/components/layout/NavigationBar';
import {Box} from '@mui/material';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <Box sx={{flexGrow: 1}}>
      <NavigationBar />
      <main>{children}</main>
    </Box>
  );
}
