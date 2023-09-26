const db = require('../config/db.js');

module.exports = {
    // 특정 게시글의 모든 댓글 가져오기
    getComments: async (postId) => {
        const query = "SELECT * FROM Comment where post_id=?;";
        const comments = await db.query(query, [postId]);
        
        return comments[0];
    },
}