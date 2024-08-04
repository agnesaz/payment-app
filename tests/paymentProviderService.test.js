const PaymentProviderService = require('../services/PaymentProviderService');
const PaymentProvider = require('../models/PaymentProvider');
const { generateToken } = require('../utils/generateProviderToken');

jest.mock('../models/PaymentProvider');
jest.mock('../utils/generateProviderToken');

describe('PaymentProviderService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create a payment provider', async () => {
    // Mocking the generateToken function
    const mockToken = 'mockToken123';
    generateToken.mockReturnValue(mockToken);

    // Mocking the save method of PaymentProvider
    const mockProvider = { name: 'Test Provider', token: mockToken, save: jest.fn().mockResolvedValue(this) };
    PaymentProvider.prototype.save = jest.fn().mockResolvedValue(mockProvider);

    const data = { name: 'Test Provider' };
    const result = await PaymentProviderService.createPaymentProvider(data);

    expect(generateToken).toHaveBeenCalled();
    expect(PaymentProvider.prototype.save).toHaveBeenCalled();
    expect(result).toEqual(mockProvider);
  });

  test('should get all payment providers', async () => {
    // Mocking the find method of PaymentProvider
    const mockProviders = [{ name: 'Provider1', token: 'token1' }, { name: 'Provider2', token: 'token2' }];
    PaymentProvider.find = jest.fn().mockResolvedValue(mockProviders);

    const result = await PaymentProviderService.getAllProviders();

    expect(PaymentProvider.find).toHaveBeenCalled();
    expect(result).toEqual(mockProviders);
  });
});
