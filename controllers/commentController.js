const postModel = require('../models/postModel.js');
const commentModel = require('../models/commentModel.js');

module.exports = {

    createComment: async(req, res)=>{
        const postId=req.params.post_id;
        const newCommentData=req.body;
        await commentModel.createComment(postId, newCommentData.content);
        res.redirect(`/post/detail/${postId}`);
    },
    deleteComment: async(req, res)=>{
        const commentId = req.params.comment_id;
        const comment = await commentModel.getComment(commentId);
        await commentModel.deleteComment(commentId);
        res.redirect(`/post/detail/${comment.post_id}`);
    },
    //대댓글 작성
    createReply: async (req, res) => {
        const parentCommentId = req.params.comment_id;
        //console.log(parentCommentId)
        const newReplyData = req.body;
        const parentComment = await commentModel.getComment(parentCommentId);
        //console.log(parentComment)
        const postId = parentComment.post_id;
        //console.log(postId)
        await commentModel.createReply(postId, newReplyData.content, parentCommentId);
        res.redirect(`/post/detail/${postId}`);
    },
    
    deleteReply: async (req, res) => {
        const commentId = req.params.comment_id;
        const comment = await commentModel.getComment(commentId);
        await commentModel.updateParentComment(commentId); // 먼저 부모 댓글 참조를 NULL로 업데이트
        console.log(comment)
        await commentModel.deleteReply(commentId); // 그 후 대댓글 삭제
        res.redirect(`/post/detail/${comment.post_id}`);
    },



}