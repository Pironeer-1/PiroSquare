const db = require('../config/db.js');

module.exports = {

    detail: async (postId) => {
        const query = 'SELECT * FROM Post where post_id= ?;'
        const post = await db.query(query, [postId]);
        return post[0][0];
    },

    createNewPost: async(newPostData) => {
        const query = 'INSERT INTO Post (title, content, board_type_id, user_id) VALUES (?, ?, ?, ?);';
        const NewPost = await db.query(query, [newPostData.title, 
            newPostData.content, 1, 1]); //임시
        return NewPost[0].insertId;
    },
}