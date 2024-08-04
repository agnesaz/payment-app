const User = require('../models/User');

class UserService {
    static async createUser(data) {
        const { name, lastname, email, isAdmin = false } = data;
        const user = new User({ name, lastname, email, isAdmin });
        return await user.save();
    }
    static async updateAdditionalInfo(userId, additionalInfo) {
        return await User.findByIdAndUpdate(userId, additionalInfo, { new: true });
    }
}

module.exports = UserService;
