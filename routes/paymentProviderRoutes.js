const express = require('express');
const PaymentProviderController = require('../controllers/PaymentProviderController');
const checkAdminPrivileges = require('../middleware/checkAdminPrivileges');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.get('/payment-providers', PaymentProviderController.getPaymentProviders);

router.post('/create-provider', verifyToken, checkAdminPrivileges, PaymentProviderController.createPaymentProvider);

module.exports = router;
