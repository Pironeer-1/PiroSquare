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
        const userId=await userModel.getUserId(user.ID);
        const postId=req.params.post_id;

        const isliked = await postLikeModel.checkLike(userId, postId);
        if(isliked){ // true면 좋아요 되어있다는 뜻
            await postLikeModel.unlike(userId, postId);

            await postModel.likeCountUpdate(postId, 'unlike');

            // console.log('좋아요 해제됨');
        }else{  // false면 좋아요 안되어있다는 뜻
            await postLikeModel.like(userId, postId);

            await postModel.likeCountUpdate(postId, 'like');

            // console.log('좋아요 등록됨');
        }
        res.json({result: 'success'});
    },
    // 댓글에 대한 like
    // 좋아요 버튼을 누를 때 /like/comment/:comment_id 주소로 post 형식으로 보낼 것
    commentLikeAction: async(req,res)=>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);
        const commentId=req.params.comment_id;
        console.log(commentId);
        const isliked = await commentLikeModel.checkLike(userId, commentId);
        if(isliked){ // true면 좋아요 되어있다는 뜻
            await commentLikeModel.unlike(userId, commentId);

            await commentModel.likeCount(commentId, 'unlike');
        }else{  // false면 좋아요 안되어있다는 뜻
            await commentLikeModel.like(userId, commentId);
            
            await commentModel.likeCount(commentId, 'like');
        }
        res.json({result: 'success'});
    },
}