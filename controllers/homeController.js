const homeModel = require('../models/homeModel.js');

module.exports = {
    getPosts: async (req,res) =>{
        const posts = await homeModel.home();
        const users = await homeModel.getTest();
        const user = await req.user
        console.log(req.user);
        let error = req.query.error;
        if(error===undefined)
            error=null;
        console.log(error);
        res.render('home.ejs', {posts: posts, user: user, error: error});
    },
}