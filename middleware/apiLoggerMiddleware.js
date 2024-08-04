const logger = require('../config/logger');

const requestLogger = (req, res, next) => {
  const { method, originalUrl } = req;
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    logger.info({
      level: 'info',
      message: `${method} ${originalUrl} ${status} ${duration}ms`,
      timestamp: new Date().toISOString(),
      user: req.user ? req.user.id : 'anonymous'
    });
  });

  next();
};

module.exports = requestLogger;
