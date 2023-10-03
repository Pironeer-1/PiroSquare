const db = require('../config/db.js');

module.exports = {
    //모든 댓글 가져오기
    getComments: async (postId) => {
    const query = `
        SELECT 
            Comment.*, 
            User.*
        FROM 
            Comment 
        INNER JOIN 
            User ON Comment.user_id = User.user_id 
        WHERE 
            Comment.post_id = ?;
    `;
    const comments = await db.query(query, [postId]);
        return comments[0];
    },
    // comment에 대한 post_id 불러오기
    getComment: async (commentId) => {
        const query = `
        SELECT 
            comment.*, 
            User.*
        FROM 
            Comment
        INNER JOIN 
            User ON Comment.user_id = User.user_id 
        WHERE 
            comment_id=?;
        `;
        const comment = await db.query(query, [commentId]);
        return comment[0][0];
    },
    createComment: async (postId, userId, newCommentData) => {
        const query = "INSERT INTO Comment (content, post_id, user_id) VALUES (?,?,?);";
        await db.query(query, [newCommentData, postId, userId]);
    },
    //대댓글 작성
    createReply: async (postId, userId, newReplyData, parentCommentId) => {
        const query = "INSERT INTO Comment (content, post_id, parent_comment_id, user_id) VALUES (?, ?, ?, ?);";
        await db.query(query, [newReplyData, postId, parentCommentId, userId]);
    },
    //댓글 삭제
    deleteComment: async (commentId)=>{
        const query = "UPDATE Comment SET content='삭제된 댓글입니다.', parent_comment_id=-1 where comment_id=?;";
        await db.query(query,[commentId]);
    },
    // 대댓글 삭제
    deleteReply: async (commentId) => {
        const query = "DELETE FROM Comment WHERE comment_id = ?;";
        await db.query(query, [commentId]);
    },
    // 좋아요 개수 업데이트
    likeCount: async(commentId, action) => {
        let query;
        if(action==='like'){
            query = 'UPDATE Comment SET likes_count=likes_count+1 WHERE comment_id=?;';
        }else if(action==='unlike'){
            query = 'UPDATE Comment SET likes_count=likes_count-1 WHERE comment_id=?;';
        }
        await db.query(query, [commentId]);
    },
}