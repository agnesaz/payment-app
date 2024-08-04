const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  country: { type: String },
  phone: { type: String },
  postalCode: { type: String },
});

module.exports = mongoose.model('User', userSchema);
