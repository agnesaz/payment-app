const mongoose = require('mongoose');
const PaymentProvider = require('../models/PaymentProvider');
const { generateToken } = require('../utils/generateProviderToken');


async function migrate() {
  try {
    await mongoose.connect('mongodb://localhost:27017/payment-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const providersCount = await PaymentProvider.countDocuments();

    if (providersCount === 0) {
      // Create Unicorn Payment provider
      const defaultProvider = new PaymentProvider({
        name: 'Unicorn Payment',
        token: generateToken(), 
      });

      await defaultProvider.save();
      console.log('Unicorn Payment provider created.');
    } else {
      console.log('Providers already exist. No changes made.');
    }
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrate();
