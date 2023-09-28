const db = require('../config/db.js');

module.exports = {
    updateNewUser: async (user, updateUser) => {
        const query = 'UPDATE User SET name=?, nickname=?, year=?, introduce=? WHERE user_id=?;';
        await db.query(query, [updateUser.name, updateUser.nickname, updateUser.year, updateUser.introduce, user.user_id]);
    }
}