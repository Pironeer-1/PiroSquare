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
}
