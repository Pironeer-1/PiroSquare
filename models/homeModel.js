const db = require('../config/db.js');

module.exports = {
    home: async () => {
        const query = 'SELECT * FROM Post'
        const posts = await db.query(query);

        return posts[0];
    },
}
