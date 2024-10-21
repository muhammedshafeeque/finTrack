const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const mongoose = require('mongoose');

// Get all accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    console.log('Fetched accounts:', accounts);
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Error fetching accounts', error: error.message });
  }
});

// Get a single account by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching account with ID:', id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid account ID format');
      return res.status(400).json({ message: 'Invalid account ID format' });
    }
    const account = await Account.findById(id);
    if (!account) {
      console.log('Account not found');
      return res.status(404).json({ message: 'Account not found' });
    }
    console.log('Account found:', account);
    res.json(account);
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ message: 'Error fetching account', error: error.message });
  }
});

// Add a new account
router.post('/', async (req, res) => {
  try {
    console.log('Received account data:', req.body);
    const { name, type, balance } = req.body;
    const newAccount = new Account({
      name,
      type,
      balance: balance || 0
    });

    console.log('Saving new account:', newAccount);
    const savedAccount = await newAccount.save();
    console.log('Account saved successfully');
    res.status(201).json(savedAccount);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(400).json({ message: 'Error creating account', error: error.message });
  }
});

// ... (other routes for updating and deleting accounts)

module.exports = router;
