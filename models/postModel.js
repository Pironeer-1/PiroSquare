const db = require('../config/db.js');

module.exports = {

    detail: async (postId) => {
        const query = 'SELECT * FROM Post where post_id= ?;'
        const post = await db.query(query, [postId]);
        return post[0][0];
    },

    createNewPost: async(newTitle, newContent) => {
        const query = 'INSERT INTO Post (title, content) VALUES (?, ?)'
        const NewPost = await db.query(query, [newTitle, newContent]);
        return NewPost[0];
    },
}