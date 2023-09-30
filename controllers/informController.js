const homeModel = require('../models/homeModel.js');
const informModel = require('../models/informModel.js');

module.exports = {
    //공지 게시판 모든 글 불러오기
    getAll: async(req, res) =>{
        const informs = await informModel.getAll();
        const allPosts = await homeModel.home();
        res.render('inform/inform.ejs', {informs: informs});
    },
    //공지 게시판 디테일 
    detail: async(req, res) =>{
        const postId = req.params.post_id
        const inform = await informModel.detail(postId);
        const informs = await homeModel.home();
        res.render('inform/informDetail.ejs', {informs: informs, inform: inform});
    },

    
}