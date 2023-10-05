const db = require('../config/db.js');
const xss = require("xss");

module.exports = {
    //모든 댓글 가져오기
    getComments: async (userId, postId) => {
    const query = `
    SELECT 
        A.*,
        C.*,
        (CASE
            WHEN comment_like_id IS NULL THEN false
            ELSE true 
        END) AS is_user_like
    FROM Comment A 
        LEFT OUTER JOIN 
            (SELECT * 
            FROM commentlike 
            WHERE user_id=?) B 
            ON A.comment_id=B.comment_id
        INNER JOIN
            User C
            ON A.user_id = C.user_id
    WHERE A.post_id=?;
    `;
    const comments = await db.query(query, [userId, postId]);
        return comments[0];
    },
    // comment 가져오기
    getComment: async (userId, commentId) => {
        const query = `
        SELECT 
            A.*,
            C.*,
            (CASE
                WHEN comment_like_id IS NULL THEN false
                ELSE true 
            END) AS is_user_like
        FROM Comment A 
            LEFT OUTER JOIN 
                (SELECT * 
                FROM commentlike 
                WHERE user_id=?) B 
                ON A.comment_id=B.comment_id
            INNER JOIN
                User C
                ON A.user_id = C.user_id
        WHERE A.comment_id=?;
        `;
        const comment = await db.query(query, [userId, commentId]);

        // xss 처리한 content 원래대로
        const targetComment = comment[0][0];        
        targetComment.content = targetComment.content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

        return targetComment;
    },
    // comment 데이터만 필요한 경우
    simpleComment: async (commentId) => {
        const query = `
        SELECT *
        FROM Comment
        WHERE comment_id=?;
        `;
        const comment = await db.query(query, [commentId]);
        
        // xss 처리한 content 원래대로
        const targetComment = comment[0][0];        
        targetComment.content = targetComment.content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

        return targetComment;
    },
    createComment: async (postId, userId, newCommentData, CommentImage) => {
        const xssComment = xss(newCommentData);
        const query = "INSERT INTO `Comment` (content, likes_count, user_id, post_id, comment_image) VALUES (?, 0, ?, ?, ?);";
        await db.query(query, [xssComment, userId, postId, CommentImage]);
    },
    //대댓글 작성
    createReply: async (postId, userId, newReplyData, parentCommentId, CommentImage) => {
        const xssComment = xss(newCommentData);
        const query = "INSERT INTO `Comment` (content, likes_count, user_id, post_id, parent_comment_id, comment_image) VALUES (?, 0, ?, ?, ?, ?);";
        await db.query(query, [xssComment, userId, postId, parentCommentId, CommentImage]);
    },
    //댓글 삭제
    deleteComment: async (commentId)=>{
        const query = "UPDATE Comment SET content='삭제된 댓글입니다.', parent_comment_id=-1 where comment_id=?;";
        await db.query(query,[commentId]);
    },
    // 대댓글 삭제
    // 대댓글은 아예 지워져버리게 설정, 만약 댓글처럼 삭제되었다고 표시만 하고 싶다면 댓글 삭제할 때 parent_comment_id를 -1로 설정하면 안됨
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