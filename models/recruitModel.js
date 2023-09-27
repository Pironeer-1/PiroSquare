const db = require('../config/db.js');

module.exports = {

    getAll: async()=>{
        const query = "SELECT * FROM Post where board_type_id='4';"
        const posts = await db.query(query);
        return posts[0];
    },
    detail: async (postId) => {
        const query = "SELECT * FROM Post where post_id=? and board_type_id='4';"
        const post = await db.query(query, [postId]);
        return post[0][0];
    },

    createNewRecruit: async(newPostData) => {
        const query = 'INSERT INTO Post (title, content, board_type_id, user_id) VALUES (?, ?, ?, ?);';
        const NewPost = await db.query(query, [newPostData.title, 
            newPostData.content, 4, 1]); //user_id 임시
        return NewPost[0].insertId;
    },

    deleteRecruit: async(postId) => {
        const query = 'DELETE FROM Post WHERE post_id= ?;'
        await db.query(query, [postId]);
    },

    updateRecruit: async(postId, newPostData) => {
        const query = 'UPDATE Post SET title=?, content=? WHERE post_id=?;';
        await db.query(query, [newPostData.title, newPostData.content, postId]);
    },
    
}