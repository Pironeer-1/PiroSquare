const questionModel = require('../models/questionModel.js');
const commentModel = require('../models/commentModel.js');
const postModel = require('../models/postModel.js');
const postLikeModel = require('../models/postLikeModel.js');
const commentLikeModel = require('../models/commentLikeModel.js');
const userModel = require('../models/userModel.js');

module.exports = {
    // 게시글에 대한 like
    // 좋아요 버튼을 누를 때 /like/post/:post_id 주소로 post 형식으로 보낼 것
    postLikeAction: async(req,res)=>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
        }

        const userId=await userModel.getUserId(user.ID);
        const postId=req.params.post_id;

        const likeresult = await postLikeModel.likeAction(userId, postId);
        
        if(likeresult){ // true면 좋아요 설정 동작을 했다는뜻
            await postModel.likeCount(postId, 'like');

            // 임시로 메인으로 리다이렉트시킴, 나중에 json반환으로 바꿔야함
            const message = encodeURIComponent(`해당 게시글에 좋아요 등록이 되었습니다.\n post_id:${postId},\n user_id:${userId}`);
            res.redirect(`/?error=${message}`);
        }else{  // false면 좋아요 해제 동작을 했다는뜻
            await postModel.likeCount(postId, 'unlike');

            const message = encodeURIComponent(`해당 게시글의 좋아요가 해제 되었습니다.\n post_id:${postId},\n user_id:${userId}`);
            res.redirect(`/?error=${message}`);
        }

    },
    // 댓글에 대한 like
    // 좋아요 버튼을 누를 때 /like/comment/:comment_id 주소로 post 형식으로 보낼 것
    commentLikeAction: async(req,res)=>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
        }

        const userId=await userModel.getUserId(user.ID);
        const commentId=req.params.comment_id;

        const likeresult = await commentLikeModel.likeAction(userId, commentId);
        
        if(likeresult){ // true면 좋아요 설정 동작을 했다는뜻
            await commentModel.likeCount(commentId, 'like');

            // 임시로 메인으로 리다이렉트시킴, 나중에 json반환으로 바꿔야함
            const message = encodeURIComponent(`해당 댓글에 좋아요 등록이 되었습니다.\n comment_id:${commentId},\n user_id:${userId}`);
            res.redirect(`/?error=${message}`);
        }else{  // false면 좋아요 해제 동작을 했다는뜻
            await commentModel.likeCount(commentId, 'like');

            const message = encodeURIComponent(`해당 댓글의 좋아요가 해제 되었습니다.\n comment_id:${commentId},\n user_id:${userId}`);
            res.redirect(`/?error=${message}`);
        }
    },
}