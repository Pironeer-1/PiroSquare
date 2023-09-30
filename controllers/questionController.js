const homeModel = require('../models/homeModel.js');
const questionModel = require('../models/questionModel.js');
const commentModel = require('../models/commentModel.js');
const userModel = require('../models/userModel.js');
const postModel = require('../models/postModel.js');

module.exports = {
    // 질문게시판 메인
    getAll: async(req,res)=>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const question_posts = await postModel.getAll(3);
        res.render('question/question_main.ejs', {question_posts: question_posts});
    },
    // 질문게시글
    detailPost: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const questionId=req.params.post_id
        const question = await postModel.detail(questionId);

        const comments = await commentModel.getComments(questionId);

        res.render('question/question_detail.ejs', {question: question, comments: comments});
    },
    // 필터링
    filteringPost: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const search=req.body.search;
        const filter=req.body.filter;

        const filteredposts = await questionModel.search(search,filter);

        res.render('question/question_main.ejs', {question_posts: filteredposts});
    },
    // 질문게시글 작성
    createForm: async (req,res) => {
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        res.render('question/question_create.ejs');
    },
    // 작성된 질문게시글 생성
    createPost: async (req,res) => {
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const userId=await userModel.getUserId(user.ID);

        const newPost = req.body;
        const resultId = await questionModel.createNewPost(newPost, userId);
        
        res.redirect(`/question/read/${resultId}`);
        // res.json({insertId: result.insertId});
    },
    // 게시글 삭제
    deletePost: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const userId=await userModel.getUserId(user.ID);
        const postId = req.params.post_id;

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.detail(postId);
        if(post.user_id===null || post.user_id!==userId){
            const message = encodeURIComponent('글의 작성자만 글을 삭제할 수 있습니다.');
            // 임시로 main으로 redirect 시켰음
            res.redirect(`/?error=${message}`);
        }else{
            await postModel.deletePost(postId);
            res.redirect('/question');
        }
    },
    // 게시글 업데이트 폼
    updateForm: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const userId=await userModel.getUserId(user.ID);
        const postId=req.params.post_id

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.detail(postId);
        if(post.user_id===null || post.user_id!==userId){
            const message = encodeURIComponent('글의 작성자만 글을 수정할 수 있습니다.');
            // 임시로 main으로 redirect 시켰음
            res.redirect(`/?error=${message}`);
        }else{
            const question = await questionModel.detail(postId);
            res.render('question/question_update.ejs', {question: question});
        }
        
    },
    // 게시글 업데이트
    updatePost: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const postId=req.params.post_id

        const newPost = req.body;
        await questionModel.updatePost(postId, newPost);
            
        const question = await questionModel.detail(postId);
        const comments = await commentModel.getComments(postId);
        res.render('question/question_detail.ejs', {question: question, comments: comments});
    },
}