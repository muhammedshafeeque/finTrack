const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: ['checking', 'savings', 'credit', 'cash'],
    required: true,
  },
});

module.exports = mongoose.model('Account', accountSchema);
