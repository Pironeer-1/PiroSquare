const db = require('../config/db.js');


module.exports = {

    answer: async (commentId, parentCommentId) => {
        const query = "INSERT INTO Answer (comment_id, parent_id) VALUES (?, ?);";
        await db.query(query, [commentId, parentCommentId]);
    },
}

