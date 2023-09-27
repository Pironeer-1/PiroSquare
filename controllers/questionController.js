const homeModel = require('../models/homeModel.js');
const questionModel = require('../models/questionModel.js');
const commentModel = require('../models/commentModel.js');

module.exports = {
    // 질문게시판 메인
    getAll: async(req,res)=>{
        const question_posts = await questionModel.getAll();
        res.render('question/question_main.ejs', {question_posts: question_posts});
    },
    // 질문게시글
    detailPost: async (req, res) =>{
        const questionId=req.params.post_id
        const question = await questionModel.detail(questionId);

        const comments = await commentModel.getComments(questionId);

        res.render('question/question_detail.ejs', {question: question, comments: comments});
    },
    // 필터링
    filteringPost: async (req, res) =>{
        const search=req.body.search;
        const filter=req.body.filter;

        const filteredposts = await questionModel.search(search,filter);

        res.render('question/question_main.ejs', {question_posts: filteredposts});
    },
    // 질문게시글 작성
    createForm: async (req,res) => {

        res.render('question/question_create.ejs');
    },
    // 작성된 질문게시글 생성
    createPost: async (req,res) => {
        const newPost = req.body;
        const resultId = await questionModel.createNewPost(newPost);
        
        res.redirect(`/question/read/${resultId}`);
        // res.json({insertId: result.insertId});
    },
    // 게시글 삭제
    deletePost: async (req, res) =>{
        const postId = req.params.post_id;
        await questionModel.deletePost(postId);
        res.redirect('/question');
    },
    // 게시글 업데이트 폼
    updateForm: async (req, res) =>{
        const postId=req.params.post_id
        const question = await questionModel.detail(postId);
        res.render('question/question_update.ejs', {question: question});
    },
    // 게시글 업데이트
    updatePost: async (req, res) =>{
        const postId=req.params.post_id;
        const newPost = req.body;
        await questionModel.updatePost(postId, newPost);
        
        const question = await questionModel.detail(postId);
        const comments = await commentModel.getComments(postId);
        res.render('question/question_detail.ejs', {question: question, comments: comments});
    },
}