const db = require("../config/db.js");
const xss = require("xss");

module.exports = {
  // 필터
  search: async (filterCategory, filterStatus) => {
    let query = "SELECT * FROM Post WHERE board_type_id='4'";

    if (filterStatus === "solved") {
      query += " AND activate=0";
    } else if (filterStatus === "unsolved") {
      query += " AND activate=1";
    }

    if (filterCategory === "study") {
      query += " AND category='1'";
    } else if (filterCategory === "project") {
      query += " AND category='2'";
    } else if (filterCategory === "recruit") {
      query += " AND category='3'";
    }

    const posts = await db.query(query);
    return posts[0];
  },

    createNewRecruit: async(newPostData, userId, imagePath) => {
        const xssTitle = xss(newPostData.title);
        const xssContent = xss(newPostData.content);
        const query='INSERT INTO Post (title, content, board_type_id, user_id, post_image, category, member, start_date, end_date, likes_count, comments_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0);';
        let NewPost;
        if(newPostData.category=='study'){
            NewPost = await db.query(query, [xssTitle, 
                xssContent, 4, userId, imagePath, 1, newPostData.member, newPostData.start_date, newPostData.end_date]);
        }
        else if(newPostData.category=='project'){
            NewPost = await db.query(query, [xssTitle,  
                xssContent, 4, userId, imagePath, 2, newPostData.member, newPostData.start_date, newPostData.end_date]);
        }
        else if(newPostData.category=='recruit'){
            NewPost = await db.query(query, [xssTitle, 
                xssContent, 4, userId, imagePath, 3, newPostData.member, newPostData.start_date, newPostData.end_date]);
        }
        return NewPost[0].insertId;
    },    

    // 게시글 업데이트
    updatePost: async(postId, newPostData, PostImage) => {
        const xssTitle = xss(newPostData.title);
        const xssContent = xss(newPostData.content);
        const query = 'UPDATE Post SET title=?, content=?, post_image=?, category, member, start_date, end_date, WHERE post_id=?;';
        
        if(newPostData.category=='study'){
            await db.query(query, [xssTitle, xssContent, PostImage, 1, newPostData.member, newPostData.start_date, newPostData.end_date, postId]);
        }
        else if(newPostData.category=='project'){
            await db.query(query, [xssTitle, xssContent, PostImage, 2, newPostData.member, newPostData.start_date, newPostData.end_date, postId]);
        }
        else if(newPostData.category=='recruit'){
            await db.query(query, [xssTitle, xssContent, PostImage, 3, newPostData.member, newPostData.start_date, newPostData.end_date, postId]);
        }
    }
}