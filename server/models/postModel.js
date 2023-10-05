const db = require('../config/db.js');
const xss = require("xss");

module.exports = {
    // board_type_id 로 서로 다른 게시글 데이터를 가져옴
    getAll: async(user_id, board_type_id)=>{
        const query = `
        SELECT 
            A.*,
            C.*,
            (CASE
                WHEN post_like_id IS NULL THEN false
                ELSE true 
            END) AS is_user_like
        FROM post A 
            LEFT OUTER JOIN 
                (SELECT * 
                FROM postlike 
                WHERE user_id=?) B 
                ON A.post_id=B.post_id
            INNER JOIN
                User C
                ON A.user_id = C.user_id
        WHERE A.board_type_id=?;
        `;
        const posts = await db.query(query, [user_id, board_type_id]);
        return posts[0];
    },
    detail: async (user_id, postId) => {
        const query =`
        SELECT 
            A.*,
            C.*,
            (CASE
                WHEN post_like_id IS NULL THEN false
                ELSE true 
            END) AS is_user_like
        FROM post A 
            LEFT OUTER JOIN 
                (SELECT * 
                FROM postlike 
                WHERE user_id=?) B 
                ON A.post_id=B.post_id
            INNER JOIN
                User C
                ON A.user_id = C.user_id
        WHERE A.post_id=?;
        `;
        const post = await db.query(query, [user_id, postId]);

        // xss 처리한 content 원래대로
        const targetPost = post[0][0];        
        targetPost.content = targetPost.content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

        return targetPost;
    },
    // 간단하게 post 정보만 필요한 경우
    getPost: async (postId) => {
        const query =`
        SELECT *
        FROM post 
        WHERE post_id=?;
        `;
        const post = await db.query(query, [user_id, postId]);
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
    filter: async (search, filter, board_type_id) => {
        search='%'+search+'%';
        let query = "SELECT * FROM Post WHERE board_type_id=? and title LIKE ?";
        
        if (filter === 'latest') { // 최신순
            query += " ORDER BY created_at DESC;";
        } else if (filter === 'popular') { // 좋아요순
            query += " ORDER BY likes_count DESC, created_at DESC;";
        }
        const posts = await db.query(query, [board_type_id, search]);
        return posts[0];
    },
    // 게시글 생성
    createNewPost: async(newPostData, userId, PostImage, board_type_id) => {
        const xssContent = xss(newPostData.content);
        const query = 'INSERT INTO Post (title, content, user_id, post_image, board_type_id, likes_count, comments_count) VALUES (?, ?, ?, ?, ?, ?, ?);';
        const NewPost = await db.query(query, [newPostData.title, xssContent, userId, PostImage, board_type_id, 0, 0]);
        
        return NewPost[0].insertId;
    },
    // 게시글 삭제
    deletePost: async(postId) => {
        const query = 'DELETE FROM Post WHERE post_id= ?;'
        await db.query(query, [postId]);
    },
    // 게시글 업데이트
    updatePost: async(postId, newPostData, PostImage) => {
        const xssContent = xss(newPostData.content);
        const query = 'UPDATE Post SET title=?, content=?, post_image=? WHERE post_id=?;';
        await db.query(query, [newPostData.title, xssContent, PostImage, postId]);
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
    // postModel.js

    // 게시글 이전 글
    getPreviousPost: async (boardTypeId, postId) => {
        const query = `
            SELECT * FROM Post
            WHERE board_type_id = ? AND post_id < ?
            ORDER BY post_id DESC
            LIMIT 1;        
        `;
        const post = await db.query(query, [boardTypeId, postId]);
        return post[0][0];
    },

    // 게시글 다음 글
    getNextPost: async (boardTypeId, postId) => {
        const query = `
            SELECT * FROM Post
            WHERE board_type_id = ? AND post_id > ?
            ORDER BY post_id ASC
            LIMIT 1;
        `;
        const post = await db.query(query, [boardTypeId, postId]);
        return post[0][0];
    }

}