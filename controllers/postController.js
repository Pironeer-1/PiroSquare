const homeModel = require('../models/homeModel.js');
const postModel = require('../models/postModel.js');
const commentModel = require('../models/commentModel.js');
const userModel = require('../models/userModel.js');

module.exports = {
    // 자유 게시판 메인
    getAll: async(req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const posts = await postModel.getAll(1);
        res.render('post/post.ejs', {posts: posts});
    },
    // 자유게시판 검색 하기
    searchPost: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const search=req.body.search;
        const searchPosts = await postModel.search(search, 1);
        res.render('post/post.ejs', {posts: searchPosts});
    },

    // 자유 게시판 디테일
    detailPost: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }
        
        const postId=req.params.post_id
        const posts = await postModel.getAll();
        const post = await postModel.detail(postId);
        const comments = await commentModel.getComments(postId);
        res.render('post/postDetail.ejs', { posts: posts, post: post, comments: comments});
    },
    // 글 작성 폼
    createPost: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        res.render('post/postCreate.ejs');
    },
    //글 작성 하기
    createNewPost: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const userId=await userModel.getUserId(user.ID);

        const newPostData = req.body;

        console.log(user);
   
        const insertId = await postModel.createNewPost(newPostData, userId, 1);
        res.redirect(`/post/detail/${insertId}`);
    },
    // 글 삭제
    deletePost: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const userId=await userModel.getUserId(user.ID);
        const postId = req.params.post_id;

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.detail(postId);
        if(post.user_id===null || post.user_id!==userId){
            const message = encodeURIComponent('글의 작성자만 글을 삭제할 수 있습니다.');
            // 임시로 main으로 redirect 시켰음
            res.redirect(`/?error=${message}`);
        }else{
            await postModel.deletePost(postId);
            res.redirect('/post');
        }
    },
    // 글 수정 폼
    updatePost: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const userId=await userModel.getUserId(user.ID);
        const postId=req.params.post_id

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.detail(postId);
        if(post.user_id===null || post.user_id!==userId){
            const message = encodeURIComponent('글의 작성자만 글을 수정할 수 있습니다.');
            // 임시로 main으로 redirect 시켰음
            res.redirect(`/?error=${message}`);
        }else{
            const postId=req.params.post_id
            const post = await postModel.detail(postId);
            const posts = await homeModel.home();
            res.render('post/postUpdate.ejs', {posts: posts ,post: post});
        }
    },
    //글 수정 하기
    updateNewPost: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const postId=req.params.post_id;
        const newPostData = req.body;
        await postModel.updatePost(postId, newPostData);
        res.redirect(`/post/detail/${postId}`);
    },
    
}


