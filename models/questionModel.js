const db = require('../config/db.js');
const xss = require("xss");

module.exports = {
    // 모든 질문게시글 불러오기
    getAll: async () => {
        const query = "SELECT * FROM Post where board_type_id='3';"
        const questions = await db.query(query);
        return questions[0];
    },
    // 특정 질문게시글 불러오기
    detail: async (postId) => {
        const query = "SELECT * FROM Post where post_id=? and board_type_id='3';"
        const question = await db.query(query, [postId]);
        return question[0][0];
    },
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
    createNewPost: async (newPostData) => {
        let query='';
        let NewPost='';
        if(newPostData.useCodeBlock=='yes' && newPostData.hidden_ta!=null){
            // const defendXSS = xss(newPostData.hidden_ta);
            query = 'INSERT INTO Post (title, content, board_type_id, user_id, code_language, code) VALUES (?, ?, ?, ?, ?, ?);';
            NewPost = await db.query(query, [newPostData.title, newPostData.content, 3, 1, newPostData.codeLanguage, newPostData.hidden_ta]); //임시
        }else{
            query = 'INSERT INTO Post (title, content, board_type_id, user_id) VALUES (?, ?, ?, ?);';
            NewPost = await db.query(query, [newPostData.title, newPostData.content, 3, 1]); //임시
        }

        return NewPost[0].insertId;
    },
    // 질문게시글 삭제
    deletePost: async(postId) => {
        const query = 'DELETE FROM Post WHERE post_id= ? and board_type_id="3";';
        await db.query(query, [postId]);
    },
    // 질문게시글 업데이트
    updatePost: async (postId, newPostData) => {
        let query='';
        let NewPost='';
        if(newPostData.useCodeBlock=='yes' && newPostData.hidden_ta!=null){
            query = 'UPDATE Post SET title=?, content=?, code_language=?, code=? WHERE post_id=?;';
            NewPost = await db.query(query, [newPostData.title, newPostData.content, newPostData.codeLanguage, newPostData.hidden_ta, postId]);
        }else{
            query = 'UPDATE Post SET title=?, content=? WHERE post_id=?;';
            NewPost = await db.query(query, [newPostData.title, newPostData.content, postId]);
        }
    },
}