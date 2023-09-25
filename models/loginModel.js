const db = require('../config/db.js');

module.exports = {

    getUsers: async ()=>{
        const query = `SELECT * FROM User`;
        const users = await db.query(query);
        
        return users[0];
    },
    loginProcess: async (user)=>{
        const { id, pwd } = user;
        const query = 'SELECT * FROM User WHERE ID = ?';
        const [rows, fields] = await db.query(query, [id]);

        if (rows.length === 1 && rows[0].password === pwd) {
            console.log('성공');
            return rows[0]; // 로그인 성공
        } else {
            console.log('실패');
            return null; // 로그인 실패
        }
    }
}