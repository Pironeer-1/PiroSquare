const db = require('../config/db.js');

module.exports = {

    getTest: async ()=>{
        const query = 'SELECT * FROM User;';
        const users = await db.query(query);

        return users[0];
    },

    home: async () => {
        const query = 'SELECT * FROM Post'
        const posts = await db.query(query);

        return posts[0];
    },
    getUser: async (username)=>{
        const query = `SELECT * FROM User WHERE ID = ?`;
        const [rows, fields] = await db.query(query, [username]);
        return rows[0];
    },
    getSession: async (req) => {
        const loggedInUser = req.session; 

        return loggedInUser;
    },
}
