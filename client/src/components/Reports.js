import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function Reports() {
  const [report, setReport] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const generateReport = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/transactions/report?startDate=${startDate}&endDate=${endDate}`);
      setReport(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const prepareChartData = () => {
    if (!report) return [];

    const expenseData = Object.entries(report.expensesByCategory).map(([category, amount]) => ({
      category,
      Expenses: amount,
    }));

    const revenueData = Object.entries(report.revenueByCategory).map(([category, amount]) => ({
      category,
      Revenue: amount,
    }));

    // Merge expense and revenue data
    const mergedData = [...expenseData];
    revenueData.forEach(item => {
      const existingItem = mergedData.find(d => d.category === item.category);
      if (existingItem) {
        existingItem.Revenue = item.Revenue;
      } else {
        mergedData.push(item);
      }
    });

    return mergedData;
  };

  return (
    <Box>
      <Heading mb={6}>Financial Reports</Heading>
      <VStack spacing={4} align="stretch" mb={8}>
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormControl>
        <Button onClick={generateReport} colorScheme="blue">Generate Report</Button>
      </VStack>
      {report && (
        <Box>
          <SimpleGrid columns={3} spacing={10} mb={10}>
            <Box>
              <Heading size="md">Total Expenses</Heading>
              <Text fontSize="2xl">${report.totalExpenses.toFixed(2)}</Text>
            </Box>
            <Box>
              <Heading size="md">Total Revenue</Heading>
              <Text fontSize="2xl">${report.totalRevenue.toFixed(2)}</Text>
            </Box>
            <Box>
              <Heading size="md">Net Income</Heading>
              <Text fontSize="2xl" color={report.netIncome >= 0 ? "green.500" : "red.500"}>
                ${report.netIncome.toFixed(2)}
              </Text>
            </Box>
          </SimpleGrid>
          <Box height="400px" mb={10}>
            <Heading size="md" mb={4}>Expenses and Revenue by Category</Heading>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prepareChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Expenses" fill="#FF6384" />
                <Bar dataKey="Revenue" fill="#36A2EB" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Reports;
