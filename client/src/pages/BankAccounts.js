import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import BankAccountManager from '../components/BankAccountManager';

function BankAccounts() {
  return (
    <Box>
      <Heading as="h2" size="xl" mb={6}>Bank Accounts</Heading>
      <BankAccountManager />
    </Box>
  );
}

export default BankAccounts;
