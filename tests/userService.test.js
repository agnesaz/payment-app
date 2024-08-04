// __tests__/UserService.test.js
const UserService = require('../services/UserService');
const User = require('../models/User');

jest.mock('../models/User');

describe('UserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new user successfully', async () => {
        const mockUser = { save: jest.fn().mockResolvedValue(true) };
        User.mockImplementation(() => mockUser);

        const data = {
            name: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
        };

        const result = await UserService.createUser(data);

        expect(result).toBe(true);
        expect(User).toHaveBeenCalledWith({
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            isAdmin: false,
        });
        expect(mockUser.save).toHaveBeenCalled();
    });

    test('should create a new user with isAdmin set to true', async () => {
        const mockUser = { save: jest.fn().mockResolvedValue(true) };
        User.mockImplementation(() => mockUser);

        const data = {
            name: 'Jane',
            lastname: 'Doe',
            email: 'jane.doe@example.com',
            isAdmin: true,
        };

        const result = await UserService.createUser(data);

        expect(result).toBe(true);
        expect(User).toHaveBeenCalledWith({
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            isAdmin: data.isAdmin,
        });
        expect(mockUser.save).toHaveBeenCalled();
    });

    test('should update additional info for a user', async () => {
        const mockUpdatedUser = { _id: 'userId123', name: 'John', lastname: 'Doe', email: 'john.doe@example.com', isAdmin: false };
        User.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedUser);

        const userId = 'userId123';
        const additionalInfo = { isAdmin: true };

        const result = await UserService.updateAdditionalInfo(userId, additionalInfo);

        expect(result).toEqual(mockUpdatedUser);
        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, additionalInfo, { new: true });
    });

    test('should handle errors when creating a user', async () => {
        const error = new Error('Database error');
        User.mockImplementation(() => { throw error; });

        const data = {
            name: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
        };

        await expect(UserService.createUser(data)).rejects.toThrow('Database error');
    });

    test('should handle errors when updating user info', async () => {
        const error = new Error('Database error');
        User.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

        const userId = 'userId123';
        const additionalInfo = { isAdmin: true };

        await expect(UserService.updateAdditionalInfo(userId, additionalInfo)).rejects.toThrow('Database error');
    });
});
