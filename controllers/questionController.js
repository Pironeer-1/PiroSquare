const homeModel = require('../models/homeModel.js');
const questionModel = require('../models/questionModel.js');

module.exports = {
    // getAll: async(req,res)=>{
    //     const questions = await questionModel.getAll();
    //     const allposts = await homeModel.home();
    //     res.render('question.ejs', {allposts: allposts, question: question});
    // },
    detailPost: async (req, res) =>{
        const questionId=req.params.post_id
        const question = await questionModel.detail(questionId);
        const allposts = await homeModel.home();
        res.render('question.ejs', {allposts: allposts, question: question});
    },
}