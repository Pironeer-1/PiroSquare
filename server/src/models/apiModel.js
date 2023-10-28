const db = require('../config/db.js');

module.exports = {
    getUser: async (username)=>{
        const query = `SELECT * FROM User WHERE ID = ?`;
        const [rows, fields] = await db.query(query, [username]);
        return rows[0];
    },
}