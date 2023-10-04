const homeModel = require('../models/homeModel.js');
const postModel = require('../models/postModel.js');

module.exports = {
    //공지 게시판 모든 글 불러오기
    getAll: async(req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        const informs = await postModel.getAll(userId, 2);
        const allPosts = await homeModel.home();
        
        res.json({informs: informs});
    },
    //공지 게시판 디테일 
    detail: async(req, res) =>{
        const user = await req.user;
        const userId=await userModel.getUserId(user.ID);

        const postId = req.params.post_id;
        const inform = await postModel.detail(userId, postId);
        const informs = await homeModel.home();
        
        const previous = await postModel.getPreviousPost(2, postId); //이전글 (이전글이 없다면 undefined)
        const next = await postModel.getNextPost(2, postId); //다음글 (다음글이 없다면 undefined)

        res.json({informs: informs, inform: inform, previous: previous, next: next});
    },

    
}