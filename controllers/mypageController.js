const mypageModel = require('../models/mypageModel.js');
module.exports = {
    getUserInfo: async (req, res) => {
        const user = await req.user
        res.render('mypage/mypage.ejs', {user: user});
    },
    updateUser: async (req, res) => {
        const user = await req.user
        res.render('mypage/userUpdate.ejs', {user: user});
    },
    updateNewUser: async (req, res) => {
        const user = await req.user;
        const updateUser = req.body;
        await mypageModel.updateNewUser(user, updateUser);
        res.redirect('/mypage');
    }
}