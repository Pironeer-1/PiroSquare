const db = require('../config/db.js');

module.exports = {
    updateNewUser: async (user, updateUser, image) => {
        const query = 'UPDATE User SET nickname=?, introduce=?, email=?, image=? WHERE user_id=?;';
        await db.query(query, [updateUser.nickname, updateUser.introduce, updateUser.email, image, user.user_id]);
    }
}