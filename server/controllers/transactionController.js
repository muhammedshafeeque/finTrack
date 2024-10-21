const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ date: -1 })
      .populate('category')
      .populate('account');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const savedTransaction = await newTransaction.save();
    const populatedTransaction = await Transaction.findById(savedTransaction._id)
      .populate('category')
      .populate('account');
    res.status(201).json(populatedTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error creating transaction', error: error.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const transactions = await Transaction.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });

    const report = {
      totalExpenses: 0,
      totalRevenue: 0,
      netIncome: 0,
      expensesByCategory: {},
      revenueByCategory: {},
    };

    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        report.totalExpenses += transaction.amount;
        report.expensesByCategory[transaction.category] = (report.expensesByCategory[transaction.category] || 0) + transaction.amount;
      } else {
        report.totalRevenue += transaction.amount;
        report.revenueByCategory[transaction.category] = (report.revenueByCategory[transaction.category] || 0) + transaction.amount;
      }
    });

    report.netIncome = report.totalRevenue - report.totalExpenses;

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error: error.message });
  }
};

// Add more controller functions for updating and deleting transactions
