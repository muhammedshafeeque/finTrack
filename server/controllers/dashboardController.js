const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');

exports.getDashboardData = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const budgets = await Budget.find();

    const totalBalance = transactions.reduce((acc, t) => acc + t.amount, 0);
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const savings = income - expenses;

    res.json({
      totalBalance,
      income,
      expenses,
      savings,
      balanceTrend: 'increase',
      balanceTrendValue: '5.75%',
      incomeTrendValue: '3.25%',
      expensesTrendValue: '2.5%',
      savingsTrend: 'increase',
      savingsTrendValue: '8.5%',
      incomeProgress: 75,
      expensesProgress: 60,
      savingsProgress: 80,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
};
