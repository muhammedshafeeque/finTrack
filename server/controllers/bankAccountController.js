const BankAccount = require('../models/BankAccount');

exports.getBankAccounts = async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find();
    res.json(bankAccounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bank accounts', error: error.message });
  }
};

exports.createBankAccount = async (req, res) => {
  try {
    const newBankAccount = new BankAccount(req.body);
    const savedBankAccount = await newBankAccount.save();
    res.status(201).json(savedBankAccount);
  } catch (error) {
    res.status(400).json({ message: 'Error creating bank account', error: error.message });
  }
};
