const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getAllTransactions);
router.post('/', transactionController.createTransaction);
router.get('/report', transactionController.getReport);

// Add more routes for updating and deleting transactions

module.exports = router;
