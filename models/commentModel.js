const db = require('../config/db.js');
const { post } = require('../routers/postRouter.js');

module.exports = {
    // 특정 게시글의 모든 댓글 가져오기
    getComments: async (postId) => {
        const query = "SELECT * FROM Comment where post_id=?;";
        const comments = await db.query(query, [postId]);
        return comments[0];
    },
    // comment에 대한 post_id 불러오기
    getComment: async (commentId) => {
        const query = "SELECT * FROM Comment where comment_id=?;";
        const comment = await db.query(query, [commentId]);
        return comment[0][0];
    },
    createComment: async (postId, newCommentData) => {
        const query = "INSERT INTO Comment (content, post_id, user_id) VALUES (?,?,?);";
        await db.query(query, [newCommentData, postId, 1]); //user_id 임시
    },

    deleteComment: async (commentId)=>{
        const query = "DELETE FROM Comment WHERE comment_id = ?;";
        await db.query(query,[commentId]);
    },
}