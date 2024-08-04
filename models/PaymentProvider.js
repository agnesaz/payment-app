const mongoose = require('mongoose');

const paymentProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  token: { type: String, required: true }
});

module.exports = mongoose.model('PaymentProvider', paymentProviderSchema);
