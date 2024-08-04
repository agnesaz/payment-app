class UnicornPaymentService {
    static async processPayment(data) {
        console.log('Processing payment with UnicornPaymentService:', data);

        // Simulate a delay to mock payment processing
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Randomly simulate success or failure
        const isSuccess = Math.random() > 0.5;

        if (isSuccess) {
            return { success: true, message: 'Payment processed successfully' };
        } else {
            return { success: false, message: 'Payment failed. Please try again' };
        }
    }
}

module.exports = UnicornPaymentService;
