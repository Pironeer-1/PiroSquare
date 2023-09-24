const homeModel = require('../models/homeModel.js');
const postModel = require('../models/postModel.js');

module.exports = {

    detailPost: async (req, res) =>{
        const postId=req.params.post_id
        const post = await postModel.detail(postId);
        const posts = await homeModel.home();
        res.render('post.ejs', {posts: posts ,post: post});
    },
    
    createPost: async (req, res) =>{
        const posts = await homeModel.home();
        res.render('postCreate.ejs', {posts: posts});
    },

    createNewPost: async (req, res) =>{
        const newTitle = req.body.title;
        const newContent = req.body.title;
        const newPost = await postModel.createNewPost(newTitle, newContent);
        res.render('post.ejs', {newPost: newPost});
    },

}

