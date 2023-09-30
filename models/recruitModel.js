const db = require('../config/db.js');

module.exports = {

    getAll: async()=>{
        const query = `
        SELECT 
            Post.*, 
            User.name AS user_name 
        FROM 
            Post 
        INNER JOIN 
            User ON Post.user_id = User.user_id 
        WHERE 
            Post.board_type_id = '4';
    `;
        const posts = await db.query(query);
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
            Post.board_type_id = '4' and post_id= ?;;
        `;
        const post = await db.query(query, [postId]);
        return post[0][0];
    },
    // 필터
    search: async (filterCategory, filterStatus) => {
        let query = "SELECT * FROM Post WHERE board_type_id='4'";
        
        if (filterStatus === 'solved') {
            query += " AND activate=0";
        } else if (filterStatus === 'unsolved') {
            query += " AND activate=1";
        }
    
        if (filterCategory === 'study') {
            query += " AND category='1'";
        } else if (filterCategory === 'project') {
            query += " AND category='2'";
        } else if (filterCategory === 'recruit') {
            query += " AND category='3'";
        }
    
        const posts = await db.query(query);
        return posts[0];
    },

    createNewRecruit: async(newPostData) => {
        let query='';
        let NewPost;
        if(newPostData.category=='study'){
            query = 'INSERT INTO Post (title, content, board_type_id, user_id, category ) VALUES (?, ?, ?, ?, ?);';
            NewPost = await db.query(query, [newPostData.title, 
                newPostData.content, 4, 1, 1]); //user_id 임시
        }
        else if(newPostData.category=='project'){
            query = 'INSERT INTO Post (title, content, board_type_id, user_id, category ) VALUES (?, ?, ?, ?, ?);';
            NewPost = await db.query(query, [newPostData.title, 
                newPostData.content, 4, 1, 2]); //user_id 임시
        }
        else if(newPostData.category=='recruit'){
            query = 'INSERT INTO Post (title, content, board_type_id, user_id, category ) VALUES (?, ?, ?, ?, ?);';
            NewPost = await db.query(query, [newPostData.title, 
                newPostData.content, 4, 1, 3]); //user_id 임시
        }
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