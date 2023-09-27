const homeModel = require('../models/homeModel.js');
const postModel = require('../models/postModel.js');
const commentModel = require('../models/commentModel.js');
module.exports = {
    // 자유 게시판 모든 글 불러오기
    getAll: async(req, res) =>{
        const posts = await postModel.getAll();
        res.render('post/post.ejs', {posts: posts});
    },

    detailPost: async (req, res) =>{

        const postId=req.params.post_id
        const posts = await postModel.getAll();
        const post = await postModel.detail(postId);
        const comments = await commentModel.getComments(postId);
        res.render('post/postDetail.ejs', { posts: posts, post: post, comments: comments });
    },
    
    createPost: async (req, res) =>{
        const posts = await postModel.getAll();
        res.render('post/postCreate.ejs', {posts: posts});
    },

    createNewPost: async (req, res) =>{
        const newPostData = req.body;
        const insertId = await postModel.createNewPost(newPostData);
        res.redirect(`/post/detail/${insertId}`);
    },

    deletePost: async (req, res) =>{
        const postId = req.params.post_id;
        await postModel.deletePost(postId);
        res.redirect('/post');
    },

    updatePost: async (req, res) =>{
        const postId=req.params.post_id
        const post = await postModel.detail(postId);
        const posts = await homeModel.home();
        res.render('post/postUpdate.ejs', {posts: posts ,post: post});
    },
    updateNewPost: async (req, res) =>{
        const postId=req.params.post_id;
        const newPostData = req.body;
        await postModel.updatePost(postId, newPostData);
        res.redirect(`/post/detail/${postId}`);
    },
}


