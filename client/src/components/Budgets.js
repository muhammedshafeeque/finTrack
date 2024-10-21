import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Progress, Text, VStack, useToast } from '@chakra-ui/react';
import { fetchBudgets } from '../utils/api';

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const loadBudgets = async () => {
      try {
        const data = await fetchBudgets();
        setBudgets(data);
        setIsLoading(false);
      } catch (error) {
        toast({
          title: 'Error loading budgets',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    };

    loadBudgets();
  }, [toast]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Heading as="h2" size="xl" mb={6}>Budgets</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {budgets.map((budget) => (
          <VStack key={budget._id} align="stretch" p={4} borderWidth={1} borderRadius="lg">
            <Heading size="md">{budget.category}</Heading>
            <Text>
              ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
            </Text>
            <Progress
              value={(budget.spent / budget.limit) * 100}
              colorScheme={budget.spent > budget.limit ? 'red' : 'green'}
            />
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Budgets;
