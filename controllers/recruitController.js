const homeModel = require('../models/homeModel.js');
const recruitModel = require('../models/recruitModel.js');
const commentModel = require('../models/commentModel.js');

module.exports = {
    
    getAll: async(req, res) =>{
        const posts = await recruitModel.getAll();
        res.render('recruit/recruit.ejs', {posts: posts});
    },

    detail: async (req, res) =>{
        const postId=req.params.post_id
        const post = await recruitModel.detail(postId);
        const posts = await recruitModel.getAll();
        const comments = await commentModel.getComments(postId);
        res.render('recruit/recruitDetail.ejs', {posts: posts ,post: post, comments: comments});
    },
    //필터링 
    filteringPost: async (req, res) =>{
        const filter=req.body.filter;
        const filteredPosts = await recruitModel.search(filter);
        res.render('recruit/recruit.ejs', {posts: filteredPosts});
    },
    createRecruit: async (req, res) =>{
        const posts = await recruitModel.getAll();
        res.render('recruit/recruitCreate.ejs', {posts: posts});
    },

    createNewRecruit: async (req, res) =>{
        const newPostData = req.body;
        const insertId = await recruitModel.createNewRecruit(newPostData);
        res.redirect(`/recruit/detail/${insertId}`);
    },

    deleteRecruit: async (req, res) =>{
        const postId = req.params.post_id;
        await recruitModel.deleteRecruit(postId);
        res.redirect(`/recruit`);
    },

    updateRecruit: async (req, res) =>{
        const postId=req.params.post_id
        const post = await recruitModel.detail(postId);
        const posts = await homeModel.home();
        res.render('recruit/recruitUpdate.ejs', {posts: posts ,post: post});
    },
    updateNewRecruit: async (req, res) =>{
        const postId=req.params.post_id;
        const newPostData = req.body;
        await recruitModel.updateRecruit(postId, newPostData);
        res.redirect(`/recruit/detail/${postId}`);
    },

}