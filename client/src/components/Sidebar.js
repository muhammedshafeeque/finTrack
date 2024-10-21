import React from 'react';
import { Box, VStack, Icon, Text, Link as ChakraLink, useColorModeValue, Flex, Tooltip, Button } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FiHome, FiDollarSign, FiPieChart, FiBarChart2, FiSettings, FiHelpCircle, FiList, FiCreditCard } from 'react-icons/fi';

const SidebarItem = ({ icon, children, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const color = useColorModeValue('gray.600', 'gray.300');
  const activeColor = useColorModeValue('brand.500', 'brand.200');
  const activeBg = useColorModeValue('brand.50', 'rgba(49, 151, 149, 0.12)');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Tooltip label={children} placement="right" hasArrow>
      <ChakraLink
        as={RouterLink}
        to={to}
        w="full"
        _hover={{ textDecoration: 'none', bg: hoverBg }}
        bg={isActive ? activeBg : 'transparent'}
        borderRadius="full"
      >
        <Flex
          align="center"
          p={3}
          transition="all 0.3s"
        >
          <Icon as={icon} boxSize={5} color={isActive ? activeColor : color} />
          <Text ml={4} fontWeight="medium" color={isActive ? activeColor : color} display={{ base: 'none', md: 'block' }}>
            {children}
          </Text>
        </Flex>
      </ChakraLink>
    </Tooltip>
  );
};

function Sidebar() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="nav"
      pos="fixed"
      top="16" // Adjust this value to match your header height
      left="0"
      zIndex="sticky"
      h="calc(100vh - 4rem)" // Subtract header height from viewport height
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={bg}
      borderRight="1px"
      borderRightColor={borderColor}
      w={{ base: '14', md: '60' }}
      transition="width 0.3s"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: useColorModeValue('gray.300', 'gray.600'),
          borderRadius: '24px',
        },
      }}
    >
      <VStack align="stretch" spacing={2} mt="6">
        <SidebarItem icon={FiHome} to="/">Dashboard</SidebarItem>
        <SidebarItem icon={FiDollarSign} to="/transactions">Transactions</SidebarItem>
        <SidebarItem icon={FiList} to="/categories">Categories</SidebarItem>
        <SidebarItem icon={FiCreditCard} to="/bank-accounts">Bank Accounts</SidebarItem>
        <SidebarItem icon={FiPieChart} to="/budgets">Budgets</SidebarItem>
        <SidebarItem icon={FiBarChart2} to="/reports">Reports</SidebarItem>
        <SidebarItem icon={FiSettings} to="/settings">Settings</SidebarItem>
      </VStack>
      <VStack align="stretch" spacing={4} mt="auto" mb="6" px="4">
        <Button leftIcon={<FiHelpCircle />} variant="outline" size="sm" borderRadius="full">
          Help Center
        </Button>
      </VStack>
    </Box>
  );
}

export default Sidebar;
