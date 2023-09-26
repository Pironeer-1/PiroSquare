const db = require('../config/db.js');

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
}