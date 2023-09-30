const db = require('../config/db.js');

module.exports = {

    getAll: async()=>{
        const query = "SELECT * FROM Post where board_type_id='1';"
        const posts = await db.query(query);
        return posts[0];
    },
    detail: async (postId) => {
        const query = 'SELECT * FROM Post where post_id= ?;'
        const post = await db.query(query, [postId]);
        return post[0][0];
    },
   // 특정 게시글 검색
   search: async (search) => {
    // 인자 search 는 검색할 게시글 제목
    let query='';
    let posts;
    search='%'+search+'%';
    query = "SELECT * FROM Post where board_type_id='1' and title LIKE ?;";
    posts = await db.query(query, [search]);
    return posts[0];
    },

    createNewPost: async(newPostData) => {
        const query = 'INSERT INTO Post (title, content, board_type_id, user_id) VALUES (?, ?, ?, ?);';
        const NewPost = await db.query(query, [newPostData.title, 
            newPostData.content, 1, 1]); //user_id 임시
        return NewPost[0].insertId;
    },

    deletePost: async(postId) => {
        const query = 'DELETE FROM Post WHERE post_id= ?;'
        await db.query(query, [postId]);
    },

    updatePost: async(postId, newPostData) => {
        const query = 'UPDATE Post SET title=?, content=? WHERE post_id=?;';
        await db.query(query, [newPostData.title, newPostData.content, postId]);
    },
    
    // 좋아요 개수 업데이트
    likeCount: async(postId, action) => {
        let query;
        if(action==='like'){
            query = 'UPDATE Post SET likes_count=likes_count+1 WHERE post_id=?;';
        }else if(action==='unlike'){
            query = 'UPDATE Post SET likes_count=likes_count-1 WHERE post_id=?;';
        }
        await db.query(query, [postId]);
    },
}