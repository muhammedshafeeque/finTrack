import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import AddTransactionModal from '../components/AddTransactionModal';

function AddTransaction() {
  return (
    <Box>
      <Heading as="h2" size="xl" mb={6}>Add New Transaction</Heading>
      <AddTransactionModal isOpen={true} onClose={() => {}} onTransactionAdded={() => {}} />
    </Box>
  );
}

export default AddTransaction;
