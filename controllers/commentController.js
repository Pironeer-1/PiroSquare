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
        console.log(comment);
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
}