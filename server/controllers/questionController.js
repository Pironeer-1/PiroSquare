const homeModel = require('../models/homeModel.js');
const questionModel = require('../models/questionModel.js');
const commentModel = require('../models/commentModel.js');
const userModel = require('../models/userModel.js');
const postModel = require('../models/postModel.js');

module.exports = {
    // 질문게시판 메인
    getAll: async(req,res)=>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        const question_posts = await postModel.getAll(userId, 3);
        
        res.json({question_posts: question_posts});
    },
    // 질문게시글
    detailPost: async (req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        const questionId=req.params.post_id;
        const question = await postModel.detail(userId, questionId);
        const comments = await commentModel.getComments(userId, questionId);

        const previous = await postModel.getPreviousPost(3, questionId); //이전글 (이전글이 없다면 undefined)
        const next = await postModel.getNextPost(3, questionId); //다음글 (다음글이 없다면 undefined)

        res.json({question: question, comments: comments, previous: previous, next: next});
    },
    // 필터링
    filteringPost: async (req, res) =>{
        const search=req.query.keyword;
        const searchPosts = await postModel.search(search, 3);

        res.json({question_posts: searchPosts});
    },
    // 질문게시글 폼(프론트 사용 X)
    createForm: async (req,res) => {
        res.render('question/question_create.ejs');
    },
    // 작성된 질문게시글 생성
    createPost: async (req,res) => {
        const user = await req.user;

        const userId=await userModel.getUserId(user.ID);
        const newPost = req.body;
        const imagePath = req.file ? `http://localhost:8000/post/image/${req.file.filename}` : '';
        const resultId = await questionModel.createNewPost(newPost, userId, imagePath);
        
        res.json({insertId: resultId});
    },
    // 게시글 삭제
    deletePost: async (req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);
        const postId = req.params.post_id;

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.getPost(postId);
        if(post.user_id===null || post.user_id!==userId){
            res.json({result: "fail"});
        }else{
            await postModel.deletePost(postId);
            
            res.json({result: "success"});
        }
    },
    // 게시글 업데이트 폼(프론트 사용 X)
    updateForm: async (req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);
        const postId=req.params.post_id;

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.getPost(postId);
        if(post.user_id===null || post.user_id!==userId){
            const message = encodeURIComponent('글의 작성자만 글을 수정할 수 있습니다.');
            res.redirect(`/?error=${message}`);
        }else{
            const question = await postModel.getPost(postId);
            res.render('question/question_update.ejs', {question: question});
        }
    },
    // 게시글 업데이트
    updatePost: async (req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);
        const postId=req.params.post_id;

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.getPost(postId);
        if(post.user_id===null || post.user_id!==userId){
            res.json({result: "fail"});
        }else{
            await postModel.deletePost(postId);
            const newPost = req.body;
            const imagePath = req.file ? `http://localhost:8000/post/image/${req.file.filename}` : '';
            await questionModel.updatePost(postId, newPost, imagePath);

            res.json({result: "success"});
        }
    },
}