const homeModel = require('../models/homeModel.js');

module.exports = {
    getPosts: async (req,res) =>{
        const user = await req.user;
        const posts = await homeModel.home();
        const users = await homeModel.getTest();
        // console.log(req.session.passport.user);
        let error = req.query.error;
        if(error===undefined)
            error=null;
        console.log(error);
        res.render('home.ejs', {posts: posts, user: user, error: error});
    },
}