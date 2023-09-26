const homeModel = require('../models/homeModel.js');
const questionModel = require('../models/questionModel.js');

module.exports = {
    // 질문게시판 메인
    getAll: async(req,res)=>{
        const question_posts = await questionModel.getAll();
        const allposts = await homeModel.home();
        res.render('question_main.ejs', {allposts: allposts, question_posts: question_posts});
    },
    // 질문게시글
    detailPost: async (req, res) =>{
        const questionId=req.params.post_id
        const question = await questionModel.detail(questionId);
        const allposts = await homeModel.home();
        res.render('question_detail.ejs', {allposts: allposts, question: question});
    },
}