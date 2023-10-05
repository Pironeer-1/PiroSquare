const db = require('../config/db.js');

module.exports = {
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

    createNewRecruit: async(newPostData, userId, imagePath) => {
        const query='INSERT INTO Post (title, content, board_type_id, user_id, post_image, category, likes_count, comments_count) VALUES (?, ?, ?, ?, ?, ?, 0, 0);';
        let NewPost;
        if(newPostData.category=='study'){
            NewPost = await db.query(query, [newPostData.title, 
                newPostData.content, 4, userId, imagePath, 1]);
        }
        else if(newPostData.category=='project'){
            NewPost = await db.query(query, [newPostData.title, 
                newPostData.content, 4, userId, imagePath, 2]);
        }
        else if(newPostData.category=='recruit'){
            NewPost = await db.query(query, [newPostData.title, 
                newPostData.content, 4, userId, imagePath, 3]);
        }
        return NewPost[0].insertId;
    },    
}