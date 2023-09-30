const db = require('../config/db.js');

module.exports = {
    // 해당 게시글을 좋아요 하고 있는지 확인
    // 좋아요 중인지 확인하고 좋아요 하고 있지 않은 상태면 행을 추가하고 true 반환, 반대면 삭제하고 false 반환
    likeAction: async (userId, commentId) => {
        const query = "SELECT * FROM CommentLike where user_id=? and comment_id=?;";
        const result = await db.query(query, [userId, commentId]);

        console.log('result is : '+result[0]);
        
        if(result[0].length === 0){    // 좋아요 하고 있지 않은 상태
            const query2 = 'INSERT INTO CommentLike (user_id, comment_id) VALUES (?, ?);';
            await db.query(query2, [userId, commentId]);

            return true;
        }else{  // 좋아요 하고 있는 상태
            const query2 = 'DELETE FROM CommentLike WHERE user_id=? and comment_id=?';
            await db.query(query2, [userId, commentId]);

            return false;
        }
    },
}