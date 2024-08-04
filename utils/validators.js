const { body, validationResult } = require('express-validator');

const validateRegistration = [
    body('name').notEmpty().withMessage('Name is required'),
    body('lastname').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
];

const validateCreateTransaction = [
    body('providerId').notEmpty().withMessage('Provider ID should not be empty'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount should be greater than 0'),
    handleValidationErrors
];

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    validateRegistration,
    validateCreateTransaction,
    handleValidationErrors,
};
