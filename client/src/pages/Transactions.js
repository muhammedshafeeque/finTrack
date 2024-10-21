import React, { useState, useEffect } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { fetchTransactions } from '../utils/api';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await fetchTransactions();
      setTransactions(data);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: 'Error loading transactions',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Heading as="h2" size="xl" mb={6}>Transactions</Heading>
      <Button as={Link} to="/add-transaction" colorScheme="blue" mb={4}>
        Add New Transaction
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Description</Th>
            <Th>Category</Th>
            <Th>Account</Th>
            <Th>Type</Th>
            <Th isNumeric>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction) => (
            <Tr key={transaction._id}>
              <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
              <Td>{transaction.description}</Td>
              <Td>{transaction.category.name}</Td>
              <Td>{transaction.account.name}</Td>
              <Td>{transaction.type}</Td>
              <Td isNumeric>{transaction.amount.toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Transactions;
