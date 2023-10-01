const db = require('../config/db.js');

module.exports = {
    // 해당 댓글을 좋아요 하고 있는지 확인
    checkLike: async (userId, commentId) => {
        const query = "SELECT * FROM CommentLike where user_id=? and comment_id=?;";
        const result = await db.query(query, [userId, commentId]);
        if(result[0].length === 0){    // 좋아요 하고 있지 않은 상태
            return false;
        }else{  // 좋아요 하고 있는 상태
            return true;
        }
    },
    // 좋아요 등록
    like: async (userId, commentId) => {
        const query = 'INSERT INTO CommentLike (user_id, comment_id) VALUES (?, ?);';
        await db.query(query, [userId, commentId]);
    },
    // 좋아요 해제
    unlike: async (userId, commentId) => {
        const query = 'DELETE FROM CommentLike WHERE user_id=? and comment_id=?';
        await db.query(query, [userId, commentId]);
    },
}