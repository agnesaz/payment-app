const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        'secretKey',
        { expiresIn: '24h' }
    );
};


module.exports = generateJWT;
