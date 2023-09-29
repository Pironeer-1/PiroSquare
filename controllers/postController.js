const homeModel = require('../models/homeModel.js');
const postModel = require('../models/postModel.js');
const commentModel = require('../models/commentModel.js');
module.exports = {
    // 자유 게시판 메인
    getAll: async(req, res) =>{
        const posts = await postModel.getAll();
        res.render('post/post.ejs', {posts: posts});
    },
    // 검색 하기
    searchPost: async (req, res) =>{
        const search=req.body.search;
        const searchPosts = await postModel.search(search);
        res.render('post/post.ejs', {posts: searchPosts});
    },

    // 자유 게시판 디테일
    detailPost: async (req, res) =>{
        const postId=req.params.post_id
        const posts = await postModel.getAll();
        const post = await postModel.detail(postId);
        const comments = await commentModel.getComments(postId);
        res.render('post/postDetail.ejs', { posts: posts, post: post, comments: comments});
    },
    // 글 작성 폼
    createPost: async (req, res) =>{
        const posts = await postModel.getAll();
        res.render('post/postCreate.ejs', {posts: posts});
    },
    //글 작성 하기
    createNewPost: async (req, res) =>{
        const newPostData = req.body;
        const insertId = await postModel.createNewPost(newPostData);
        res.redirect(`/post/detail/${insertId}`);
    },
    // 글 삭제
    deletePost: async (req, res) =>{
        const postId = req.params.post_id;
        await postModel.deletePost(postId);
        res.redirect('/post');
    },
    // 글 수정 폼
    updatePost: async (req, res) =>{
        const postId=req.params.post_id
        const post = await postModel.detail(postId);
        const posts = await homeModel.home();
        res.render('post/postUpdate.ejs', {posts: posts ,post: post});
    },
    //글 수정 하기
    updateNewPost: async (req, res) =>{
        const postId=req.params.post_id;
        const newPostData = req.body;
        await postModel.updatePost(postId, newPostData);
        res.redirect(`/post/detail/${postId}`);
    },
}


