import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, ColorModeScript, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import theme from './theme';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import Categories from './pages/Categories';
import BankAccounts from './pages/BankAccounts';
import Budgets from './components/Budgets';
import Reports from './components/Reports';
import Settings from './components/Settings';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <Flex minHeight="100vh" flexDirection="column">
          <Header />
          <Flex flex={1} mt="14">
            <Sidebar />
            <Box flex={1} ml={{ base: '14', md: '60' }} p={8} bg={useColorModeValue('gray.50', 'gray.900')}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/add-transaction" element={<AddTransaction />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/bank-accounts" element={<BankAccounts />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Box>
          </Flex>
          <Footer />
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
