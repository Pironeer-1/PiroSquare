const db = require('../config/db.js');
const xss = require("xss");

module.exports = {
    // 특정 질문게시글 검색
    search: async (search,filter) => {
        // 인자 search 는 검색할 게시글 제목
        let query='';
        let questions;
        if(search==''){
            if(filter=='all'){
                query = "SELECT * FROM Post where board_type_id='3';";
                questions = await db.query(query);
            }else if(filter=='solved'){
                query = "SELECT * FROM Post where board_type_id='3' and activate=0;";
                questions = await db.query(query);
            }else if(filter=='unsolved'){
                query = "SELECT * FROM Post where board_type_id='3' and activate=1;";
                questions = await db.query(query);
            }
        }else{
            search='%'+search+'%';
            if(filter=='all'){
                query = "SELECT * FROM Post where board_type_id='3' and title LIKE ?;";
                questions = await db.query(query, [search]);
            }else if(filter=='solved'){
                query = "SELECT * FROM Post where board_type_id='3' and title LIKE ? and activate=0;";
                questions = await db.query(query, [search]);
            }else if(filter=='unsolved'){
                query = "SELECT * FROM Post where board_type_id='3' and title LIKE ? and activate=1;";
                questions = await db.query(query, [search]);
            }
        }
        // 필터링 방법이 잘못되면 null을 반환
        if(questions==null)
            return null;
        return questions[0];
    },
    // 새로운 질문게시글 생성
    createNewPost: async (newPostData, userId, imagePath) => {
        const xssContent = xss(newPostData.content);
        const query = 'INSERT INTO `Post` (title, content, likes_count, comments_count, activate, board_type_id, user_id) VALUES (?, ?, 0, 0, 1, 3, ?);';
        const NewPost = await db.query(query, [newPostData.title, xssContent, userId]);

        return NewPost[0].insertId;
    },
    // 질문게시글 업데이트
    updatePost: async (postId, newPostData, imagePath) => {
        const xssContent = xss(newPostData.content);
        const query = 'UPDATE Post SET title=?, content=? WHERE post_id=?;';
        await db.query(query, [newPostData.title, xssContent, postId]);
    },
}