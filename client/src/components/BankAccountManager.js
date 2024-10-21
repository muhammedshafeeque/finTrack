import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Input,
  Select,
  Button,
  SimpleGrid,
  Text,
  useToast,
  useColorModeValue,
  Icon,
  Flex,
  Divider,
  Badge,
  InputGroup,
  InputLeftElement,
  Card,
  CardBody,
  Stack,
} from '@chakra-ui/react';
import { FiPlus, FiDollarSign, FiCreditCard } from 'react-icons/fi';
import { fetchAccounts, createAccount } from '../utils/api';
import { formatCurrency } from '../utils/currencyFormatter';

function AccountCard({ account }) {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const getAccountColor = (type) => {
    switch (type) {
      case 'cash': return 'green.500';
      case 'credit': return 'purple.500';
      default: return 'blue.500';
    }
  };

  return (
    <Card
      bg={bgColor}
      borderColor={borderColor}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
      <CardBody>
        <Flex justifyContent="space-between" alignItems="center" mb={2}>
          <HStack>
            <Icon as={FiDollarSign} color={getAccountColor(account.type)} boxSize={6} />
            <Heading size="md" fontWeight="semibold">{account.name}</Heading>
          </HStack>
          <Badge colorScheme={account.type === 'credit' ? 'purple' : account.type === 'cash' ? 'green' : 'blue'}>
            {account.type}
          </Badge>
        </Flex>
        <Divider my={3} />
        <Text fontSize="2xl" fontWeight="bold" color={account.balance >= 0 ? 'green.500' : 'red.500'}>
          {formatCurrency(account.balance)}
        </Text>
      </CardBody>
    </Card>
  );
}

function BankAccountManager() {
  const [accounts, setAccounts] = useState([]);
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountType, setNewAccountType] = useState('checking');
  const [newAccountBalance, setNewAccountBalance] = useState('');
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const fetchedAccounts = await fetchAccounts();
      setAccounts(fetchedAccounts);
    } catch (error) {
      toast({
        title: 'Error loading accounts',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCreateAccount = async () => {
    if (!newAccountName || !newAccountBalance) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await createAccount({
        name: newAccountName,
        type: newAccountType,
        balance: parseFloat(newAccountBalance),
      });
      setNewAccountName('');
      setNewAccountBalance('');
      loadAccounts();
      toast({
        title: 'Account created',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error creating account',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Manage Accounts</Heading>
      <Stack spacing={8} direction={{ base: 'column', lg: 'row' }}>
        <Box
          bg={bgColor}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
          p={6}
          shadow="md"
          flex={{ base: '1', lg: '0 0 300px' }}
        >
          <Heading size="md" mb={4}>Add New Account</Heading>
          <VStack spacing={4} align="stretch">
            <Input
              placeholder="Account name"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
            />
            <Select
              value={newAccountType}
              onChange={(e) => setNewAccountType(e.target.value)}
              icon={<FiCreditCard />}
            >
              <option value="cash">Cash</option>
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="credit">Credit</option>
            </Select>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="₹"
              />
              <Input
                placeholder="Initial balance"
                type="number"
                value={newAccountBalance}
                onChange={(e) => setNewAccountBalance(e.target.value)}
              />
            </InputGroup>
            <Button
              leftIcon={<Icon as={FiPlus} />}
              colorScheme="brand"
              onClick={handleCreateAccount}
              isFullWidth
            >
              Add Account
            </Button>
          </VStack>
        </Box>
        
        <Box flex="1">
          <Heading size="md" mb={4}>Your Accounts</Heading>
          {accounts.length === 0 ? (
            <Text color="gray.500">You haven't added any accounts yet.</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {accounts.map((account) => (
                <AccountCard key={account._id} account={account} />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default BankAccountManager;
