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
        INSERT INTO User (ID, password, name, year, nickname, image, introduce, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const User = [
        user.ID,
        user.password || 'password', 
        user.name || 'username',
        user.year || 19,
        user.nickname || 'piro',
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
        await db.query(query, [updateUser.nickname, updateUser.year, updateUser.introduce, updateUser.email, image, user.user_id]);
    },
}