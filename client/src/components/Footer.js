import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" bg="gray.100" color="gray.600" py={4}>
      <Flex maxW="container.xl" mx="auto" justifyContent="space-between" alignItems="center">
        <Text>&copy; 2023 FinTrack. All rights reserved.</Text>
        <Text>Made with ❤️ for better financial management</Text>
      </Flex>
    </Box>
  );
}

export default Footer;
