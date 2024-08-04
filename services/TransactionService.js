const Transaction = require('../models/Transaction');
const PaymentProvider = require('../models/PaymentProvider');
const UnicornPaymentService = require('./UnicornPaymentService');

class TransactionService {
    static async createTransaction(data) {
        const provider = await PaymentProvider.findById(data.providerId);

        if (!provider) {
            throw new Error('Payment provider not found');
        }

        //create a new transaction
        const transaction = new Transaction({
            userId: data.userId,
            email: data.email,
            amount: data.amount,
            status: 'pending',
            providerId: data.providerId,
        });
        console.log(transaction, "---> transaction")
        await transaction.save();

        const mockPaymentData = {
            amount: data.amount,
            email: data.email,
            providerId: data.providerId,
        };

        try {
            // process the payment
            const result = await UnicornPaymentService.processPayment(mockPaymentData);

            if (result.success) {
                transaction.status = 'completed';
                await transaction.save();

                return {
                    message: 'Payment processed successfully',
                    id: transaction.id,
                    userId: transaction.userId,
                    success: true
                };
            } else {
                transaction.status = 'failed';
                await transaction.save();

                return {
                    message: 'Payment failed. Please try again',
                    error: {
                        message: 'Payment failed due to provider issues or invalid payment details',
                        success: false,
                    }
                };
            }
        } catch (error) {
            transaction.status = 'failed';
            await transaction.save();

            return {
                message: 'An error occurred while processing the payment',
                error: {
                    message: error.message,
                    success: false,
                }
            };
        }
    }
}

module.exports = TransactionService;
