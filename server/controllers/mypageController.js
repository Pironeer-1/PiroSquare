const mypageModel = require('../models/mypageModel.js');
module.exports = {
    getInfo: async (req, res) => {
        const user = await req.user;
        const userPosts = await mypageModel.userPosts(user);
        const likePosts = await mypageModel.likePosts(user);
        const commentPosts = await mypageModel.commentPosts(user);
        console.log('userPosts', userPosts[0]);
        console.log('likePosts', likePosts[0]);
        console.log('commentPosts', commentPosts[0]);
        // res.render('mypage/mypage.ejs', {user: user, userPosts: userPosts[0], likePosts: likePosts[0], commentPosts: commentPosts[0]});
        res.json({user: user, userPosts: userPosts[0], likePosts: likePosts[0], commentPosts: commentPosts[0]});
    },
    updateUser: async (req, res) => {
        const user = await req.user
        res.render('mypage/userUpdate.ejs', {user: user});
    },
    updateNewUser: async (req, res) => {
        const user = await req.user;
        const updateUser = req.body;
        const imagePath = req.file ? `/user/${req.file.filename}` : '';
        await mypageModel.updateNewUser(user, updateUser, imagePath);
        // res.redirect('/mypage');
        res.json({result: 'success'});
    },
}