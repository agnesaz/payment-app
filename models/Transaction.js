const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true, enum: ['pending', 'completed', 'failed'] },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentProvider', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
