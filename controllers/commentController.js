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

}