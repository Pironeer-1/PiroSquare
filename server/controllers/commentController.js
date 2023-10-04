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
        
        res.json({result: "success"});
    },
    //대댓글 생성
    createReply: async (req, res) => {
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        const parentCommentId = req.params.comment_id;
        const newReplyData = req.body;
        const parentComment = await commentModel.simpleComment(parentCommentId);
        const postId = parentComment.post_id;
        
        await commentModel.createReply(postId, userId, newReplyData.content, parentCommentId);
        
        res.json({result: "success"});
    },
    //댓글 삭제
    deleteComment: async(req, res)=>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        const commentId = req.params.comment_id;
        const comment = await commentModel.simpleComment(commentId);

        if(comment.user_id===null || comment.user_id!==userId){
            res.json({result: "fail"});
        }else{
            await commentModel.deleteComment(commentId);
            res.json({result: "success"});
        }
    },
    //대댓글 삭제
    deleteReply: async (req, res) => {
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        const commentId = req.params.comment_id;
        const comment = await commentModel.simpleComment(commentId);
        
        if(comment.user_id===null || comment.user_id!==userId){
            res.json({result: "fail"});
        }else{
            await commentModel.deleteComment(commentId);
            res.json({result: "success"});
        }
    },
    
}