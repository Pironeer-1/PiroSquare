const homeModel = require('../models/homeModel.js');
const postModel = require('../models/postModel.js');

module.exports = {
    //공지 게시판 모든 글 불러오기
    getAll: async(req, res) =>{
        const informs = await postModel.getAll(2);
        const allPosts = await homeModel.home();
        res.render('inform/inform.ejs', {informs: informs});
    },
    //공지 게시판 디테일 
    detail: async(req, res) =>{
        const postId = req.params.post_id
        const inform = await postModel.detail(postId);
        const informs = await homeModel.home();
        res.render('inform/informDetail.ejs', {informs: informs, inform: inform});
    },

    
}