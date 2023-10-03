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
        let query='';
        let NewPost='';
        if(newPostData.useCodeBlock=='yes' && newPostData.hidden_ta!=null){
            // const defendXSS = xss(newPostData.hidden_ta);
            query = 'INSERT INTO Post (title, content, board_type_id, user_id, post_image, code_language, code) VALUES (?, ?, ?, ?, ?, ? ,?);';
            NewPost = await db.query(query, [newPostData.title, newPostData.content, 3, userId, imagePath, newPostData.codeLanguage, newPostData.hidden_ta]);
        }else{
            query = 'INSERT INTO Post (title, content, board_type_id, user_id, post_image) VALUES (?, ?, ?, ?, ?);';
            NewPost = await db.query(query, [newPostData.title, newPostData.content, 3, userId, imagePath ]);
        }

        return NewPost[0].insertId;
    },
    // 질문게시글 업데이트
    updatePost: async (postId, newPostData, imagePath) => {
        let query='';
        let NewPost='';
        if(newPostData.useCodeBlock=='yes' && newPostData.hidden_ta!=null){
            query = 'UPDATE Post SET title=?, content=?, post_image=? code_language=?, code=? WHERE post_id=?;';
            NewPost = await db.query(query, [newPostData.title, newPostData.content, imagePath, newPostData.codeLanguage, newPostData.hidden_ta, postId]);
        }else{
            query = 'UPDATE Post SET title=?, content=?, post_image=? WHERE post_id=?;';
            NewPost = await db.query(query, [newPostData.title, newPostData.content, imagePath, postId]);
        }
    },
}