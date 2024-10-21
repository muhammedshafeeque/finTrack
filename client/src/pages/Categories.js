import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import CategoryManager from '../components/CategoryManager';

function Categories() {
  return (
    <Box>
      <Heading as="h2" size="xl" mb={6}>Categories</Heading>
      <CategoryManager />
    </Box>
  );
}

export default Categories;
