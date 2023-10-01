const homeModel = require('../models/homeModel.js');
const recruitModel = require('../models/recruitModel.js');
const commentModel = require('../models/commentModel.js');
const postModel = require('../models/postModel.js');
const userModel = require('../models/userModel.js');

module.exports = {
    getAll: async(req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const posts = await postModel.getAll(4);
        res.render('recruit/recruit.ejs', {posts: posts});
    },
    detail: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const postId=req.params.post_id;
        const post = await postModel.detail(postId);
        const posts = await postModel.getAll(4);
        const comments = await commentModel.getComments(postId);
        res.render('recruit/recruitDetail.ejs', {posts: posts ,post: post, comments: comments});
    },
    //필터링 
    filteringPost: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const filter1=req.body.filterCategory;
        const filter2=req.body.filterStatus;
        const filteredPosts = await recruitModel.search(filter1, filter2);
        res.render('recruit/recruit.ejs', {posts: filteredPosts});
    },
    createRecruit: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const posts = await postModel.getAll(4);
        res.render('recruit/recruitCreate.ejs', {posts: posts});
    },
    createNewRecruit: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const userId=await userModel.getUserId(user.ID);

        const newPostData = req.body;
        const imagePath = req.file ? `/post/image/${req.file.filename}` : '';
        const insertId = await recruitModel.createNewRecruit(newPostData, userId, imagePath, 4);
        res.redirect(`/recruit/detail/${insertId}`);
    },
    deleteRecruit: async (req, res) =>{
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
            res.redirect('/recruit');
        }
    },
    updateRecruit: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const userId=await userModel.getUserId(user.ID);
        const postId=req.params.post_id;

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.detail(postId);
        if(post.user_id===null || post.user_id!==userId){
            const message = encodeURIComponent('글의 작성자만 글을 수정할 수 있습니다.');
            // 임시로 main으로 redirect 시켰음
            res.redirect(`/?error=${message}`);
        }else{
            const postId=req.params.post_id;
            const post = await postModel.detail(postId);
            const posts = await homeModel.home();
            res.render('recruit/recruitUpdate.ejs', {posts: posts ,post: post});
        }
    },
    updateNewRecruit: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }

        const postId=req.params.post_id;
        const newPostData = req.body;
        const imagePath = req.file ? `/post/image/${req.file.filename}` : '';
        await postModel.updatePost(postId, newPostData, imagePath);
        res.redirect(`/recruit/detail/${postId}`);
    },

}