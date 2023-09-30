const db = require('../config/db.js');

module.exports = {
    // board_type_id 로 서로 다른 게시글 데이터를 가져옴
    getAll: async(board_type_id)=>{
        const query = `
        SELECT 
            Post.*, 
            User.name AS user_name 
        FROM 
            Post 
        INNER JOIN 
            User ON Post.user_id = User.user_id 
        WHERE 
            Post.board_type_id = '?';
    `;
        const posts = await db.query(query, [board_type_id]);
        return posts[0];
    },
    detail: async (postId) => {
        const query = 
        `SELECT 
            Post.*, 
            User.name AS user_name 
        FROM 
            Post 
        INNER JOIN 
            User ON Post.user_id = User.user_id 
        WHERE 
            post_id= ?;;
        `;
        const post = await db.query(query, [postId]);
        return post[0][0];
    },

    // 기본 검색 기능(글자 검색만 가능)
    // 추가로 커스텀하고 싶다면 questionModel의 search 참고
    search: async (search, board_type_id) => {
        // 인자 search 는 검색할 게시글 제목
        let query='';
        let posts;
        search='%'+search+'%';
        query = "SELECT * FROM Post where board_type_id=? and title LIKE ?;";
        posts = await db.query(query, [board_type_id, search]);
        return posts[0];
    },
    // 게시글 생성
    createNewPost: async(newPostData, userId, board_type_id) => {
        const query = 'INSERT INTO Post (title, content, board_type_id, user_id) VALUES (?, ?, ?, ?);';
        const NewPost = await db.query(query, [newPostData.title, newPostData.content, board_type_id, userId]);

        return NewPost[0].insertId;
    },
    // 게시글 삭제
    deletePost: async(postId) => {
        const query = 'DELETE FROM Post WHERE post_id= ?;'
        await db.query(query, [postId]);
    },
    // 게시글 업데이트
    updatePost: async(postId, newPostData) => {
        const query = 'UPDATE Post SET title=?, content=? WHERE post_id=?;';
        await db.query(query, [newPostData.title, newPostData.content, postId]);
    },
    // 좋아요 개수 업데이트
    likeCountUpdate: async(postId, action) => {
        let query;
        if(action==='like'){
            query = 'UPDATE Post SET likes_count=likes_count+1 WHERE post_id=?;';
        }else if(action==='unlike'){
            query = 'UPDATE Post SET likes_count=likes_count-1 WHERE post_id=?;';
        }
        await db.query(query, [postId]);
    },

    //user불러오기
    getUser :async(userId) => {
        const query = 'SELECT * FROM User WHERE user_id=?;';
        const user = await db.query(query, [userId]);
        return user[0][0];
    },
}