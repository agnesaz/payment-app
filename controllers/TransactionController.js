const TransactionService = require('../services/TransactionService');
const logger = require('../config/logger'); 

class TransactionController {
    static async createTransaction(req, res) {
        try {  
            const { providerId, amount } = req.body;
            const { id: userId, email } = req.user;

     
            logger.info(`Request to create transaction: User ID ${userId}, Email ${email}, Amount ${amount}, Provider ID ${providerId}`);

            const transaction = await TransactionService.createTransaction({ userId, email, amount, providerId });

            logger.info(`Transaction result: ${JSON.stringify(transaction)}`);

            if (transaction.success) {
                res.status(200).json(transaction);
            } else {
                logger.error(`Transaction failed: ${transaction.message || 'Payment failed'}`);
                
                res.status(500).json({
                    message: transaction.message || 'Payment failed. Please try again',
                    error: {
                        message: 'Payment failed'
                    }
                });
            }
        } catch (error) {
            logger.error(`Unexpected error occurred while creating transaction: ${error.message}`);
            
            res.status(500).json({
                message: 'An unexpected error occurred',
                error: {
                    message: error.message
                }
            });
        }
    }
}

module.exports = TransactionController;
