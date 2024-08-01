import {Box, Container} from '@mui/material';
import dynamic from 'next/dynamic';

const NavigationBar = dynamic(
  () => import('@/components/layout/NavigationBar'),
  {ssr: false}
);

export default function MainTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <Box sx={{flexGrow: 1}}>
      <NavigationBar />
      <Container>{children}</Container>
    </Box>
  );
}
