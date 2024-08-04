const TransactionService = require('../services/TransactionService');
const Transaction = require('../models/Transaction');
const PaymentProvider = require('../models/PaymentProvider');
const UnicornPaymentService = require('../services/UnicornPaymentService');

// Mock the models and services
jest.mock('../models/Transaction');
jest.mock('../models/PaymentProvider');
jest.mock('../services/UnicornPaymentService');

describe('TransactionService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully create and process a transaction', async () => {
        // Arrange
        const mockData = {
            userId: 'user123',
            email: 'test@example.com',
            amount: 100,
            providerId: 'provider123',
        };

        const mockProvider = { id: 'provider123' };
        const mockTransaction = {
            id: 'transaction123',
            userId: 'user123',
            email: 'test@example.com',
            amount: 100,
            status: 'pending',
            providerId: 'provider123',
            save: jest.fn().mockResolvedValue(true),
        };

        PaymentProvider.findById.mockResolvedValue(mockProvider);
        Transaction.mockImplementation(() => mockTransaction);
        UnicornPaymentService.processPayment.mockResolvedValue({ success: true });

        // Act
        const result = await TransactionService.createTransaction(mockData);

        // Assert
        expect(result.success).toBe(true);
        expect(result.message).toBe('Payment processed successfully');
        expect(mockTransaction.save).toHaveBeenCalledTimes(2); // Once on creation, once on completion
        expect(UnicornPaymentService.processPayment).toHaveBeenCalledWith({
            amount: mockData.amount,
            email: mockData.email,
            providerId: mockData.providerId,
        });
    });

    it('should handle payment provider not found', async () => {
        // Arrange
        const mockData = {
            userId: 'user123',
            email: 'test@example.com',
            amount: 100,
            providerId: 'provider123',
        };

        PaymentProvider.findById.mockResolvedValue(null); // Provider not found

        // Act & Assert
        await expect(TransactionService.createTransaction(mockData))
            .rejects
            .toThrow('Payment provider not found');
    });
});
