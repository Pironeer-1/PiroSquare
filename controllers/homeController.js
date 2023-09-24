const homeModel = require('../models/homeModel.js');

module.exports = {
    getPosts: async (req,res) =>{
        const posts = await homeModel.home();
        res.render('home.ejs', {posts: posts});
    },
}