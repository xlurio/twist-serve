'use client';
import {
  Box,
  Stack,
  Tab,
  Tabs,
} from '@mui/material';
import {useCallback, useState, SyntheticEvent} from 'react';
import SearchNavigationBar from '@/components/search/SearchNavigationBar';

/**
 * Search page
 */
export default function Search() {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabsChange = useCallback(
    (_event: SyntheticEvent, newActiveTab: string) => {
      setActiveTab(newActiveTab);
    },
    []
  );

  return (
    <Stack>
      <SearchNavigationBar />
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs
          id="search-tabs-js"
          aria-label="categories"
          onChange={handleTabsChange}
          value={activeTab}
        >
          <Tab label="All" value="all" />
          <Tab label="Institutions" value="institutions" />
          <Tab label="Tournaments" value="tournaments" />
          <Tab label="Players" value="players" />
        </Tabs>
      </Box>
    </Stack>
  );
}
