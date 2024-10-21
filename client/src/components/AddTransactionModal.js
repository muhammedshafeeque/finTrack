import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import { createTransaction, fetchCategories, fetchAccounts } from '../utils/api';

function AddTransactionModal({ isOpen, onClose, onTransactionAdded }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [categoryId, setCategoryId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    loadCategories();
    loadAccounts();
  }, []);

  const loadCategories = async () => {
    try {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      if (fetchedCategories.length > 0) {
        setCategoryId(fetchedCategories[0]._id);
      }
    } catch (error) {
      toast({
        title: 'Error loading categories',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const loadAccounts = async () => {
    try {
      const fetchedAccounts = await fetchAccounts();
      setAccounts(fetchedAccounts);
      if (fetchedAccounts.length > 0) {
        setAccountId(fetchedAccounts[0]._id);
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTransaction = await createTransaction({
        description,
        amount: parseFloat(amount),
        type,
        category: categoryId,
        account: accountId,
        date: new Date(),
      });
      onTransactionAdded(newTransaction);
      toast({
        title: 'Transaction added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error adding transaction',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Type</FormLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Category</FormLabel>
              <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Account</FormLabel>
              <Select value={accountId} onChange={(e) => setAccountId(e.target.value)}>
                {accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Add Transaction
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddTransactionModal;
