const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({
            message: 'A token is required for authentication',
            error: {
                message: 'Authorization token is missing'
            }
        });
    }

    try {
        const bearerToken = token.split(' ')[1];
        const decoded = jwt.verify(bearerToken, 'secretKey');
        req.user = decoded;
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: 'Invalid Token',
            error: {
                message: err.message
            }
        });
    }

    return next();
};

module.exports = verifyToken;
