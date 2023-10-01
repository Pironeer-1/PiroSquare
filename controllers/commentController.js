const postModel = require('../models/postModel.js');
const commentModel = require('../models/commentModel.js');

module.exports = {
    //댓글 생성
    createComment: async(req, res)=>{
        const postId=req.params.post_id;
        const newCommentData=req.body;
        await commentModel.createComment(postId, newCommentData.content);
        res.redirect(`/post/detail/${postId}`);
    },
    //대댓글 생성
    createReply: async (req, res) => {
        const parentCommentId = req.params.comment_id;
        const newReplyData = req.body;
        const parentComment = await commentModel.getComment(parentCommentId);
        const postId = parentComment.post_id;
        await commentModel.createReply(postId, newReplyData.content, parentCommentId);
        res.redirect(`/post/detail/${postId}`);
    },
    //댓글 삭제
    deleteComment: async(req, res)=>{
        const commentId = req.params.comment_id;
        const comment = await commentModel.getComment(commentId);
        await commentModel.deleteComment(commentId);
        res.redirect(`/post/detail/${comment.post_id}`);
    },
    //대댓글 삭제
    deleteReply: async (req, res) => {
        const commentId = req.params.comment_id;
        const comment = await commentModel.getComment(commentId);
        await commentModel.deleteReply(commentId);
        res.redirect(`/post/detail/${comment.post_id}`);
    },
    
}