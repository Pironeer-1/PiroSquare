const db = require('../config/db.js');

module.exports = {
    // nodejs 책 2장 데이터 임시로 사용중
    getTest: async ()=>{
        const query = 'SELECT * FROM User;';
        const users = await db.query(query);

        return users[0];
    }
}