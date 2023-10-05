const homeModel = require('../models/homeModel.js');
const postModel = require('../models/postModel.js');
const commentModel = require('../models/commentModel.js');
const userModel = require('../models/userModel.js');

module.exports = {
    // 자유 게시판 메인 
    getAll: async(req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        const posts = await postModel.getAll(userId, 1);
        res.json({posts: posts});
    },
    // 자유게시판 검색 하기
    searchPost: async (req, res) =>{
        const search=req.query.keyword;
        const searchPosts = await postModel.search(search, 1);
        res.json({posts: searchPosts});
    },
    //필터링
    filteringPost: async (req, res) =>{
        const latest=req.body.latest;
        const popular=req.body.popular;
        console.log(latest,popular);
        const filteredPosts = await postModel.filter(latest, popular, 1);
        res.render('post/post.ejs', {posts: filteredPosts});
    },
    // 자유 게시판 디테일
    detailPost: async (req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);      

        const postId=req.params.post_id;
        const post = await postModel.detail(userId, postId);
        const comments = await commentModel.getComments(userId, postId);

        const previous = await postModel.getPreviousPost(1, postId); //이전글 (이전글이 없다면 undefined)
        const next = await postModel.getNextPost(1, postId); //다음글 (다음글이 없다면 undefined)

        res.json({post: post, comments: comments, previous:previous, next:next});
    },
    // 글 작성 폼(프론트 사용 X)
    createPost: async (req, res) =>{
        res.render('post/postCreate.ejs');
    },
    //글 작성 하기
    createNewPost: async (req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        const newPostData = req.body;
        const imagePath = req.file ? `http://localhost:8000/post/image/${req.file.filename}` : '';
        const insertId = await postModel.createNewPost(newPostData, userId, imagePath, 1);
        
        res.json({insertId: insertId});
    },
    // 글 삭제
    deletePost: async (req, res) =>{
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
    // 글 수정 폼(프론트 사용 X)
    updatePost: async (req, res) =>{
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
            res.render('post/postUpdate.ejs', {posts: posts ,post: post});
        }
    },
    //글 수정 하기
    updateNewPost: async (req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);
        const postId=req.params.post_id;

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.getPost(postId);
        if(post.user_id===null || post.user_id!==userId){
            res.json({result: "fail"});
        }else{
            const newPostData = req.body;
            
            const imagePath = req.file ? `http://localhost:8000/post/image/${req.file.filename}` : '';

            await postModel.updatePost(postId, newPostData, imagePath);
            
            res.json({result: "success"});
        }
    },
}


