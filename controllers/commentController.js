const postModel = require('../models/postModel.js');
const commentModel = require('../models/commentModel.js');
const userModel = require('../models/userModel.js');

module.exports = {
    //댓글 생성
    createComment: async(req, res)=>{
        const user = await req.user;
        const postId=req.params.post_id;
        const newCommentData=req.body;
        const userId=await userModel.getUserId(user.ID);
        await commentModel.createComment(postId, userId, newCommentData.content);
        res.redirect(`/post/detail/${postId}`);
    },
    //대댓글 생성
    createReply: async (req, res) => {
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);
        const parentCommentId = req.params.comment_id;
        const newReplyData = req.body;
        const parentComment = await commentModel.getComment(parentCommentId);
        const postId = parentComment.post_id;
        
        await commentModel.createReply(postId, userId, newReplyData.content, parentCommentId);
        res.redirect(`/post/detail/${postId}`);



    },
    //댓글 삭제
    deleteComment: async(req, res)=>{

        const user = await req.user;
        const commentId = req.params.comment_id;
        const comment = await commentModel.getComment(commentId);
        const userId=await userModel.getUserId(user.ID);

        if(comment.user_id===null || comment.user_id!==userId){
            const message = encodeURIComponent('댓글의 작성자만 댓글을 삭제할 수 있습니다.');
            // 임시로 main으로 redirect 시켰음
            res.redirect(`/?error=${message}`);
        }else{
            await commentModel.deleteComment(commentId);
            res.redirect(`/post/detail/${comment.post_id}`);
        }
    },
    //대댓글 삭제
    deleteReply: async (req, res) => {

        const commentId = req.params.comment_id;
        const comment = await commentModel.getComment(commentId);
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        if(comment.user_id===null || comment.user_id!==userId){
            const message = encodeURIComponent('대댓글의 작성자만 대댓글을 삭제할 수 있습니다.');
            // 임시로 main으로 redirect 시켰음
            res.redirect(`/?error=${message}`);
        }else{
            await commentModel.deleteComment(commentId);
            res.redirect(`/post/detail/${comment.post_id}`);
        }
    },
    
}