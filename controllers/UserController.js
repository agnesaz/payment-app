const UserService = require('../services/UserService');
const generateJWT = require('../utils/generateJWT');
const logger = require('../config/logger'); 

class UserController {
    static async createUser(req, res) {
        try {
            logger.info(`Request to create user: ${JSON.stringify(req.body)}`);

            const user = await UserService.createUser(req.body);
            const token = generateJWT(user);

            logger.info(`User created successfully: ${JSON.stringify(user)}`);
            logger.info(`Generated JWT for user: ${token}`);

            res.status(201).json({ user, token });
        } catch (error) {
            logger.error(`Error creating user: ${error.message}`);

            res.status(500).json({
                message: 'Failed to create user',
                error: {
                    message: error.message
                }
            });
        }
    }

    static async updateAdditionalInfo(req, res) {
        try {
            logger.info(`Request to update additional info for user ${req.user.id}: ${JSON.stringify(req.body)}`);

            const { country, phone, postalCode } = req.body;
            const userId = req.user.id;

            const updatedUser = await UserService.updateAdditionalInfo(userId, { country, phone, postalCode });

            if (updatedUser) {
                logger.info(`Additional information updated successfully for user ${userId}`);
                res.status(200).json({ message: 'Additional information updated successfully' });
            } else {
                logger.warn(`User ${userId} not found for additional info update`);
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            logger.error(`Error updating additional info for user ${req.user.id}: ${error.message}`);

            res.status(500).json({
                message: 'An unexpected error occurred',
                error: {
                    message: error.message
                }
            });
        }
    }
}

module.exports = UserController;
