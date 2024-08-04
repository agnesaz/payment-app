const PaymentProviderService = require('../services/PaymentProviderService');
const logger = require('../config/logger');

class PaymentProviderController {
    static async createPaymentProvider(req, res) {
        try {
            logger.info(`Request to create payment provider: ${JSON.stringify(req.body)}`);

            const provider = await PaymentProviderService.createPaymentProvider(req.body);

            logger.info(`Payment provider created successfully: ${JSON.stringify(provider)}`);

            res.status(201).json({ message: 'Payment provider created' });
        } catch (error) {
            logger.error(`Error creating payment provider: ${error.message}`);

            res.status(400).json({
                message: 'Failed to create payment provider',
                error: {
                    message: error.message
                }
            });
        }
    }
    static async getPaymentProviders(req, res) {
        try {
            logger.info('Request to get payment providers');
            const providers = await PaymentProviderService.getAllProviders();

            if (providers.length > 0) {
                logger.info('Payment providers retrieved successfully');
                res.status(200).json(providers);
            } else {
                logger.info('No payment providers found');
                res.status(404).json({ message: 'No payment providers found' });
            }
        } catch (error) {
            logger.error(`Error retrieving payment providers: ${error.message}`);
            res.status(500).json({ message: 'Failed to retrieve payment providers', error: error.message });
        }
    }
}

module.exports = PaymentProviderController;
