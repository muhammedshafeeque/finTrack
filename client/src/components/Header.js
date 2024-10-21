import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  Button,
  Tooltip,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, SearchIcon, BellIcon, AddIcon } from '@chakra-ui/icons';
import { FiPlus } from 'react-icons/fi';

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box as="header" bg={bg} boxShadow="sm" py={3} px={6} position="fixed" top={0} left={0} right={0} zIndex="docked" borderBottom="1px" borderColor={borderColor}>
      <Flex maxW="container.xl" mx="auto" alignItems="center" justifyContent="space-between">
        <HStack spacing={8}>
          <Text fontSize="2xl" fontWeight="bold" bgGradient="linear(to-r, brand.500, brand.300)" bgClip="text">FinTrack</Text>
          <InputGroup maxW="400px" size="sm">
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" />} />
            <Input type="text" placeholder="Search transactions, budgets..." borderRadius="full" />
          </InputGroup>
        </HStack>

        <HStack spacing={4}>
          <Tooltip label="New Transaction" hasArrow>
            <IconButton
              icon={<AddIcon />}
              colorScheme="brand"
              variant="solid"
              size="sm"
              borderRadius="full"
              aria-label="New Transaction"
            />
          </Tooltip>
          <Tooltip label="Notifications" hasArrow>
            <IconButton
              icon={<BellIcon />}
              variant="ghost"
              size="sm"
              borderRadius="full"
              aria-label="Notifications"
            />
          </Tooltip>
          <Tooltip label={`Switch to ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`} hasArrow>
            <IconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              borderRadius="full"
              aria-label="Toggle color mode"
            />
          </Tooltip>
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <Avatar size="sm" name="John Doe" src="https://bit.ly/dan-abramov" />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Header;
