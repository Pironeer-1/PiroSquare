const homeModel = require('../models/homeModel.js');
const postModel = require('../models/postModel.js');
const commentModel = require('../models/commentModel.js');
const userModel = require('../models/userModel.js');

module.exports = {
    // 자유 게시판 메인
    getAll: async(req, res) =>{
        // const user = await req.user;
        // if(user === undefined){
        //     const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
        //     res.redirect(`/?error=${message}`);
        //     return;
        // }

        const posts = await postModel.getAll(1);
        res.render('post/post.ejs', {posts: posts});
        //res.json({posts: posts});
    },
    // 자유게시판 검색 하기
    searchPost: async (req, res) =>{
        // const user = await req.user;
        // if(user === undefined){
        //     const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
        //     res.redirect(`/?error=${message}`);
        //     return;
        // }

        // const search=req.body.search;
        const search=req.query.keyword;
        const searchPosts = await postModel.search(search, 1);

        //res.render('post/post.ejs', {posts: searchPosts});
        res.json({posts: searchPosts});
    },

    //필터링
    filteringPost: async (req, res) =>{
        const user = await req.user;
        if(user === undefined){
            const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
            res.redirect(`/?error=${message}`);
            return;
        }
        const latest=req.body.latest;
        const popular=req.body.popular;
        console.log(latest,popular);
        const filteredPosts = await postModel.filter(latest, popular, 1);
        res.render('post/post.ejs', {posts: filteredPosts});
    },

    // 자유 게시판 디테일
    detailPost: async (req, res) =>{
        // const user = await req.user;
        // if(user === undefined){
        //     const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
        //     res.redirect(`/?error=${message}`);
        //     return;
        // }
        
        const postId=req.params.post_id;
        const post = await postModel.detail(postId);
        const comments = await commentModel.getComments(postId);

        // console.log(post);
        // console.log(comments);

        res.render('post/postDetail.ejs', {post: post, comments: comments});
        //res.json({post: post, comments: comments});
    },
    // 글 작성 폼
    createPost: async (req, res) =>{
        // const user = await req.user;
        // if(user === undefined){
        //     const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
        //     res.redirect(`/?error=${message}`);
        //     return;
        // }

        res.render('post/postCreate.ejs');
    },
    //글 작성 하기
    createNewPost: async (req, res) =>{
        // const user = await req.user;
        // if(user === undefined){
        //     const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
        //     res.redirect(`/?error=${message}`);
        //     return;
        // }

        // const userId=await userModel.getUserId(user.ID);
        const userId=1;

        const newPostData = req.body;

        console.log(newPostData);
        const imagePath = req.file ? `/post/image/${req.file.filename}` : '';
        const insertId = await postModel.createNewPost(newPostData, userId, imagePath, 1);
        // res.redirect(`/post/detail/${insertId}`);
        res.json({insertId: insertId});
    },
    // 글 삭제
    deletePost: async (req, res) =>{
        // const user = await req.user;
        // if(user === undefined){
        //     const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
        //     res.redirect(`/?error=${message}`);
        //     return;
        // }

        const userId=await userModel.getUserId(user.ID);
        const postId = req.params.post_id;

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.detail(postId);
        if(post.user_id===null || post.user_id!==userId){
            // const message = encodeURIComponent('글의 작성자만 글을 삭제할 수 있습니다.');
            // // 임시로 main으로 redirect 시켰음
            // res.redirect(`/?error=${message}`);
            res.json({result: "fail"});
        }else{
            await postModel.deletePost(postId);
            // res.redirect('/post');
            res.json({result: "success"});
        }
    },
    // 글 수정 폼
    updatePost: async (req, res) =>{
        const user = await req.user;
        // if(user === undefined){
        //     const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
        //     res.redirect(`/?error=${message}`);
        //     return;
        // }

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
            res.render('post/postUpdate.ejs', {posts: posts ,post: post});
        }
    },
    //글 수정 하기
    updateNewPost: async (req, res) =>{
        const user = await req.user;
        // if(user === undefined){
        //     const message = encodeURIComponent('승인된 회원만 이용할 수 있습니다.');
        //     res.redirect(`/?error=${message}`);
        //     return;
        // }

        const userId=await userModel.getUserId(user.ID);
        const postId=req.params.post_id;

        // 글의 작성자와 요청하는 사람이 같은지 확인
        const post = await postModel.detail(postId);
        if(post.user_id===null || post.user_id!==userId){
            res.json({result: "fail"});
        }else{
            const newPostData = req.body;
            // console.log(newPostData);
            const imagePath = req.file ? `/post/image/${req.file.filename}` : '';

            await postModel.updatePost(postId, newPostData, imagePath);
            // res.redirect(`/post/detail/${postId}`);
            res.json({result: "success"});
        }
    },

}


