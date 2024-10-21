const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['checking', 'savings', 'credit'],
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('BankAccount', bankAccountSchema);
