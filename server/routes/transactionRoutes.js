const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const mongoose = require('mongoose');

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('account').sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
});

// Add a new transaction
router.post('/', async (req, res) => {
  try {
    console.log('Received transaction data:', req.body);
    const { type, amount, category, description, account, date } = req.body;
    
    console.log('Checking account ID:', account);
    // Check if the account ID is valid
    if (!mongoose.Types.ObjectId.isValid(account)) {
      console.log('Invalid account ID format');
      return res.status(400).json({ message: 'Invalid account ID format' });
    }

    // Check if the account exists
    const accountDoc = await Account.findById(account);
    if (!accountDoc) {
      console.log('Account not found');
      return res.status(400).json({ message: 'Account not found', accountId: account });
    }
    console.log('Account found:', accountDoc);

    const newTransaction = new Transaction({
      type,
      amount,
      category,
      description,
      account,
      date
    });

    console.log('Saving new transaction:', newTransaction);
    const savedTransaction = await newTransaction.save();
    
    // Update account balance
    if (type === 'income') {
      accountDoc.balance += amount;
    } else if (type === 'expense') {
      accountDoc.balance -= amount;
    }
    await accountDoc.save();

    console.log('Transaction saved successfully');
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ message: 'Error adding transaction', error: error.message });
  }
});

// ... (other routes for updating and deleting transactions)

module.exports = router;
