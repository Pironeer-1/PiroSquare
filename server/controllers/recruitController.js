const homeModel = require('../models/homeModel.js');
const recruitModel = require('../models/recruitModel.js');
const commentModel = require('../models/commentModel.js');
const postModel = require('../models/postModel.js');
const userModel = require('../models/userModel.js');

module.exports = {
    getAll: async(req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        const posts = await postModel.getAll(userId, 4);
        
        res.json({posts: posts});
    },
    detail: async (req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        const postId=req.params.post_id;
        const post = await postModel.detail(userId, postId);
        const posts = await postModel.getAll(userId, 4);
        const comments = await commentModel.getComments(useId, postId);

        const previous = await postModel.getPreviousPost(4, postId); //이전글 (이전글이 없다면 undefined)
        const next = await postModel.getNextPost(4, postId); //다음글 (다음글이 없다면 undefined)
        
        res.json({posts: posts, post: post, comments: comments, previous: previous, next: next});
    },
    //필터링 
    filteringPost: async (req, res) =>{
        const filter1=req.body.filterCategory;
        const filter2=req.body.filterStatus;
        const filteredPosts = await recruitModel.search(filter1, filter2);

        res.render('recruit/recruit.ejs', {posts: filteredPosts});
    },
    // 모집게시글 폼(프론트 사용X)
    createRecruit: async (req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        const posts = await postModel.getAll(userId, 4);

        res.render('recruit/recruitCreate.ejs', {posts: posts});
    },
    createNewRecruit: async (req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        const newPostData = req.body;
        const imagePath = req.file ? `/post/image/${req.file.filename}` : '';
        const insertId = await recruitModel.createNewRecruit(newPostData, userId, imagePath, 4);
        
        res.json({insertId: insertId});
    },
    deleteRecruit: async (req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);
        const postId = req.params.post_id;

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.getPost(postId);
        if(post.user_id===null || post.user_id!==userId){
            res.json({result: "fail"});
        }else{
            await postModel.deletePost(postId);
            res.json({result: "success"});
        }
    },
    // 모집게시글 폼(프론트 사용 X)
    updateRecruit: async (req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);
        const postId=req.params.post_id;

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.getPost(postId);
        if(post.user_id===null || post.user_id!==userId){
            const message = encodeURIComponent('글의 작성자만 글을 수정할 수 있습니다.');
            res.redirect(`/?error=${message}`);
        }else{
            const postId=req.params.post_id;
            const post = await postModel.getPost(postId);
            const posts = await homeModel.home();
            res.render('recruit/recruitUpdate.ejs', {posts: posts ,post: post});
        }
    },
    updateNewRecruit: async (req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);
        const postId=req.params.post_id;

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.getPost(postId);
        if(post.user_id===null || post.user_id!==userId){
            res.json({result: "fail"});
        }else{
            const newPostData = req.body;
            const imagePath = req.file ? `/post/image/${req.file.filename}` : '';
            await postModel.updatePost(postId, newPostData, imagePath);
            
            res.json({result: "success"});
        }
    },
}