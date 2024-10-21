const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');
const Account = require('./models/Account'); // Add this line
const dashboardRoutes = require('./routes/dashboardRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const accountRoutes = require('./routes/accountRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fintrack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/accounts', accountRoutes); // Add this line

app.get('/api/dashboard', async (req, res) => {
  try {
    // Fetch all transactions
    const transactions = await Transaction.find().sort({ date: -1 });

    // Calculate total income and expenses
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate savings (assuming savings is income - expenses)
    const savings = income - expenses;

    // Calculate trends (this is a simplified example, you might want to implement more sophisticated trend calculations)
    const previousTransactions = await Transaction.find({ date: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });
    const previousIncome = previousTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const previousExpenses = previousTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const incomeTrend = income > previousIncome ? 'increase' : 'decrease';
    const expensesTrend = expenses > previousExpenses ? 'increase' : 'decrease';
    const savingsTrend = savings > (previousIncome - previousExpenses) ? 'increase' : 'decrease';

    // Calculate the total balance
    const totalBalance = transactions.reduce((total, transaction) => {
      return total + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
    }, 0);

    res.json({
      transactions: transactions.map(t => t.toObject()), // Convert to plain objects
      totalBalance,
      income,
      expenses,
      savings,
      incomeTrend,
      expensesTrend,
      savingsTrend,
      incomeTrendValue: `${Math.abs(((income - previousIncome) / previousIncome) * 100).toFixed(2)}%`,
      expensesTrendValue: `${Math.abs(((expenses - previousExpenses) / previousExpenses) * 100).toFixed(2)}%`,
      savingsTrendValue: `${Math.abs(((savings - (previousIncome - previousExpenses)) / (previousIncome - previousExpenses)) * 100).toFixed(2)}%`,
      incomeProgress: (income / (income + expenses)) * 100,
      expensesProgress: (expenses / (income + expenses)) * 100,
      savingsProgress: (savings / income) * 100
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
