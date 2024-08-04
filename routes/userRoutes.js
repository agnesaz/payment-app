// const express = require('express');
// const UserController = require('../controllers/UserController');
// const router = express.Router();
// const verifyToken = require('../middleware/authMiddleware');

// router.post('/register', UserController.createUser);

// router.post('/additional-info', verifyToken, UserController.updateAdditionalInfo);

// module.exports = router;



const express = require('express');
const { validationResult } = require('express-validator');
const UserController = require('../controllers/UserController');
const { validateRegistration } = require('../utils/validators');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// Registration route with validation
router.post('/register', validateRegistration, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    await UserController.createUser(req, res);
});

router.post('/additional-info', verifyToken, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await UserController.updateAdditionalInfo(req, res);
});

module.exports = router;
