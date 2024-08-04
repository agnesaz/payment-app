const PaymentProvider = require('../models/PaymentProvider');
const { generateToken } = require('../utils/generateProviderToken');

class PaymentProviderService {
  static async createPaymentProvider(data) {
    const { name } = data;
    const token = generateToken();
    const provider = new PaymentProvider({ name, token });
    return await provider.save();
  }
  static async getAllProviders() {
    return await PaymentProvider.find(); 
}
}

module.exports = PaymentProviderService;
