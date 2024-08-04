const mongoose = require('mongoose');
const logger = require('../config/logger');

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {});
        logger.info('Database connected successfully');
    } catch (error) {
        logger.error('Database connection failed', { error: error.message });
        process.exit(1);
    }
};

module.exports = { connect };
