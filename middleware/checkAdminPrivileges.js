const User = require('../models/User');

const checkAdminPrivileges = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: {
                    message: 'The user does not exist in the database'
                }
            });
        }

        if (user.isAdmin) {
            return next();
        } else {
            return res.status(403).json({
                message: 'Permission denied. Admins only.',
                error: {
                    message: 'User does not have admin privileges'
                }
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'An error occurred while checking admin privileges',
            error: {
                message: err.message
            }
        });
    }
};

module.exports = checkAdminPrivileges;
