const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');
const verifyToken = require('../middleware/authMiddleware');
const { validateCreateTransaction, handleValidationErrors } = require('../utils/validators');

router.post('/create-transaction', verifyToken, validateCreateTransaction, handleValidationErrors, TransactionController.createTransaction);


module.exports = router;
