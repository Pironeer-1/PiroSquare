const db = require('../config/db.js');

module.exports = {
    // 해당 게시글을 좋아요 하고 있는지 확인
    checkLike: async (userId, postId) => {
        const query = "SELECT * FROM PostLike where user_id=? and post_id=?;";
        const result = await db.query(query, [userId, postId]);
        if(result[0].length === 0){    // 좋아요 하고 있지 않은 상태
            return false;
        }else{  // 좋아요 하고 있는 상태
            return true;
        }
    },
    // 좋아요 등록
    like: async (userId, postId) => {
        const query = 'INSERT INTO PostLike (user_id, post_id) VALUES (?, ?);';
        await db.query(query, [userId, postId]);
    },
    // 좋아요 해제
    unlike: async (userId, postId) => {
        const query = 'DELETE FROM PostLike WHERE user_id=? and post_id=?';
        await db.query(query, [userId, postId]);
    },
}