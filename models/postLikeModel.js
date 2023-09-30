const db = require('../config/db.js');

module.exports = {
    // 해당 게시글을 좋아요 하고 있는지 확인
    // 좋아요 중인지 확인하고 좋아요 하고 있지 않은 상태면 행을 추가하고 true 반환, 반대면 삭제하고 false 반환
    likeAction: async (userId, postId) => {
        const query = "SELECT * FROM PostLike where user_id=? and post_id=?;";
        const result = await db.query(query, [userId, postId]);

        console.log('result is : '+result[0]);
        
        if(result[0].length === 0){    // 좋아요 하고 있지 않은 상태
            const query2 = 'INSERT INTO PostLike (user_id, post_id) VALUES (?, ?);';
            await db.query(query2, [userId, postId]);

            return true;
        }else{  // 좋아요 하고 있는 상태
            const query2 = 'DELETE FROM PostLike WHERE user_id=? and post_id=?';
            await db.query(query2, [userId, postId]);

            return false;
        }
    },
}