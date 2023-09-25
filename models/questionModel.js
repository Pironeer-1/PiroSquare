const db = require('../config/db.js');

module.exports = {
    detail: async (postId) => {
        const query = "SELECT * FROM Post where post_id=? and board_type_id='3';"
        const question = await db.query(query, [postId]);
        return question[0][0];
    },
}