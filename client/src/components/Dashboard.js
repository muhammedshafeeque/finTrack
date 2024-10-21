import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, SimpleGrid, Flex, Icon, Progress, VStack, HStack, Button, useToast, Spinner, useDisclosure, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { FiTrendingUp, FiTrendingDown, FiPieChart, FiPlus } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import { fetchDashboardData, fetchAllAccounts } from '../utils/api';
import AddTransactionModal from './AddTransactionModal';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const StatCard = ({ title, value, icon, trend, trendValue, progress }) => (
  <Box bg="white" p={6} borderRadius="2xl" boxShadow="xl" transition="all 0.3s" _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}>
    <Flex justifyContent="space-between" alignItems="center" mb={4}>
      <Icon as={icon} boxSize={10} color="brand.500" />
      <Text fontSize="sm" fontWeight="medium" color="gray.500">{title}</Text>
    </Flex>
    <Stat>
      <StatNumber fontSize="3xl" fontWeight="bold">{value}</StatNumber>
      <Flex alignItems="center" mt={2}>
        <StatArrow type={trend} />
        <StatHelpText mb={0} color={trend === 'increase' ? 'green.500' : 'red.500'}>
          {trendValue}
        </StatHelpText>
      </Flex>
    </Stat>
    {progress && (
      <Progress value={progress} colorScheme="brand" size="sm" mt={4} borderRadius="full" />
    )}
  </Box>
);

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loadDashboardData = async () => {
    try {
      const [data, accountsData] = await Promise.all([
        fetchDashboardData(),
        fetchAllAccounts()
      ]);
      
      setDashboardData(data);
      setAccounts(accountsData);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: 'Error loading dashboard data',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [toast]);

  const handleTransactionAdded = () => {
    loadDashboardData();
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box>
        <Heading as="h2" size="xl" mb={6}>Dashboard</Heading>
        <Text>No data available. Please try again later.</Text>
      </Box>
    );
  }

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  const incomeVsExpenseData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount',
        data: [dashboardData.income || 0, dashboardData.expenses || 0],
        backgroundColor: ['#48BB78', '#F56565'],
      },
    ],
  };

  const trendData = {
    labels: dashboardData.months || [],
    datasets: [
      {
        label: 'Income',
        data: dashboardData.incomeTrend || [],
        borderColor: '#48BB78',
        fill: false,
      },
      {
        label: 'Expenses',
        data: dashboardData.expensesTrend || [],
        borderColor: '#F56565',
        fill: false,
      },
    ],
  };

  const expenseCategoriesData = {
    labels: dashboardData.expenseCategories?.map(cat => cat.name) || [],
    datasets: [
      {
        data: dashboardData.expenseCategories?.map(cat => cat.amount) || [],
        backgroundColor: ['#F56565', '#ED8936', '#ECC94B', '#48BB78', '#4299E1', '#9F7AEA', '#ED64A6'],
      },
    ],
  };

  const incomeCategoriesData = {
    labels: dashboardData.incomeCategories?.map(cat => cat.name) || [],
    datasets: [
      {
        data: dashboardData.incomeCategories?.map(cat => cat.amount) || [],
        backgroundColor: ['#48BB78', '#38B2AC', '#4299E1', '#9F7AEA', '#ED64A6', '#F56565', '#ED8936'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const donutOptions = {
    ...chartOptions,
    cutout: '70%',
  };

  return (
    <VStack spacing={8} align="stretch">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="xl" fontWeight="extrabold">Dashboard</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="brand" size="sm" onClick={onOpen}>Add Transaction</Button>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
        <StatCard 
          title="Total Balance" 
          value={`₹${totalBalance.toFixed(2)}`} 
          icon={FaRupeeSign} 
          trend={dashboardData.balanceTrend} 
          trendValue={dashboardData.balanceTrendValue}
        />
        <StatCard 
          title="Income" 
          value={`₹${dashboardData.income || 0}`} 
          icon={FiTrendingUp} 
          trend="increase" 
          trendValue={dashboardData.incomeTrendValue}
          progress={dashboardData.incomeProgress}
        />
        <StatCard 
          title="Expenses" 
          value={`₹${dashboardData.expenses || 0}`} 
          icon={FiTrendingDown} 
          trend="decrease" 
          trendValue={dashboardData.expensesTrendValue}
          progress={dashboardData.expensesProgress}
        />
        <StatCard 
          title="Savings" 
          value={`₹${dashboardData.savings || 0}`} 
          icon={FiPieChart} 
          trend={dashboardData.savingsTrend} 
          trendValue={dashboardData.savingsTrendValue}
          progress={dashboardData.savingsProgress}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Box bg="white" p={6} borderRadius="2xl" boxShadow="xl" height="300px">
          <Heading as="h3" size="md" mb={4}>Income vs Expenses</Heading>
          <Bar data={incomeVsExpenseData} options={chartOptions} />
        </Box>
        <Box bg="white" p={6} borderRadius="2xl" boxShadow="xl" height="300px">
          <Heading as="h3" size="md" mb={4}>Income/Expense Trend</Heading>
          <Line data={trendData} options={chartOptions} />
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Box bg="white" p={6} borderRadius="2xl" boxShadow="xl" height="300px">
          <Heading as="h3" size="md" mb={4}>Expense Categories</Heading>
          {expenseCategoriesData.labels.length > 0 ? (
            <Doughnut data={expenseCategoriesData} options={donutOptions} />
          ) : (
            <Text>No expense categories data available</Text>
          )}
        </Box>
        <Box bg="white" p={6} borderRadius="2xl" boxShadow="xl" height="300px">
          <Heading as="h3" size="md" mb={4}>Income Categories</Heading>
          {incomeCategoriesData.labels.length > 0 ? (
            <Doughnut data={incomeCategoriesData} options={donutOptions} />
          ) : (
            <Text>No income categories data available</Text>
          )}
        </Box>
      </SimpleGrid>
      <Box bg="white" p={6} borderRadius="2xl" boxShadow="xl">
        <Heading as="h3" size="md" mb={4}>Account Details</Heading>
        {accounts.length > 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Account Name</Th>
                <Th>Balance</Th>
              </Tr>
            </Thead>
            <Tbody>
              {accounts.map((account) => (
                <Tr key={account.id}>
                  <Td>{account.name}</Td>
                  <Td>₹{account.balance.toFixed(2)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>No account data available</Text>
        )}
      </Box>
      <AddTransactionModal isOpen={isOpen} onClose={onClose} onTransactionAdded={handleTransactionAdded} />
    </VStack>
  );
}

export default Dashboard;
