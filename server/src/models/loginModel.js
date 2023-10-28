const db = require('../config/db.js');
const multer = require('multer');
const upload = multer({ dest: '../uploads/profile/' });
module.exports = {

    getUsers: async ()=>{
        const query = `SELECT * FROM User`;
        const users = await db.query(query);
        return users[0];
    },
    getUser: async (username)=>{
        const query = `SELECT * FROM User WHERE ID = ?`;
        const [rows, fields] = await db.query(query, [username]);
        return rows[0];
    },
    createUser: async function (user){
        const query = `
        INSERT INTO User (ID, name, year, nickname, image, introduce, email)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const User = [
        user.ID,
        user.name || 'username',
        user.year || null,
        user.nickname || null,
        user.image || null, // 이미지가 제공되지 않을 경우 NULL 처리
        user.introduce || null, // 소개가 제공되지 않을 경우 NULL 처리
        user.email || null,
        ];
        await db.query(query, User);
        const result = await this.getUser(user.ID);
        return result;
    },
    newUserProfile: async (user, updateUser, image) => {
        const query = 'UPDATE User SET nickname=?, year=?, introduce=?, email=?, image=? WHERE user_id=?;';
        const User = [
            updateUser.nickname || user.nickname,
            updateUser.year || user.year,
            updateUser.introduce || user.introduce, 
            updateUser.email || user.email,
            image || user.image, 
            updateUser.user_id,
        ];
        await db.query(query, User);
    },
    activateUser: async (user_id) => {
        const query = 'UPDATE User SET is_active = TRUE WHERE ID=?;';
        await db.query(query, [user_id]);
    },
    deactivateUser: async (user_id) => {
        const query = 'UPDATE User SET is_active = FALSE WHERE ID=?;';
        await db.query(query, [user_id]);
    }
}