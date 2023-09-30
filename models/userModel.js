const db = require('../config/db.js');

module.exports = {
    getUserId: async (id) => {
        const query = "SELECT * FROM User where ID=?;"
        const user = await db.query(query, [id]);
        
        return user[0][0].user_id;
    },
}