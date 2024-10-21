import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

function Home() {
  return (
    <Box maxW="container.xl" mx="auto" py={8}>
      <Heading as="h2" size="xl" mb={4}>Welcome to Personal Finance Tracker</Heading>
      <Text fontSize="lg">Start managing your finances effectively today!</Text>
    </Box>
  );
}

export default Home;
