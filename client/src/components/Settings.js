import React from 'react';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import CategoryManager from './CategoryManager';
import BankAccountManager from './BankAccountManager';

function Settings() {
  return (
    <Box>
      <Heading as="h2" size="xl" mb={6}>Settings</Heading>
      <Tabs variant="soft-rounded" colorScheme="brand">
        <TabList mb={6}>
          <Tab>Profile</Tab>
          <Tab>Categories</Tab>
          <Tab>Bank Accounts</Tab>
          <Tab>Preferences</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Profile settings (existing code) */}
          </TabPanel>
          <TabPanel>
            <CategoryManager />
          </TabPanel>
          <TabPanel>
            <BankAccountManager />
          </TabPanel>
          <TabPanel>
            {/* Preferences settings (existing code) */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Settings;
