const db = require('../config/db.js');

module.exports = {
    updateNewUser: async (user, updateUser, image) => {
        const query = 'UPDATE User SET nickname=?, introduce=?, email=?, image=? WHERE user_id=?;';
        await db.query(query, [updateUser.nickname, updateUser.introduce, updateUser.email, image||user.image, user.user_id]);
    },
    userPosts: async (user) => {
        const query = 'SELECT * FROM Post WHERE user_id = ?;';
        const userPosts = await db.query(query, [user.user_id]);
        return userPosts;
    },
    likePosts: async (user) => {
        const query = `
            SELECT P.*
            FROM Post P
            JOIN PostLike PL ON P.post_id = PL.post_id
            WHERE PL.user_id = ?;
            `;
        const likePosts = await db.query(query, [user.user_id]);
        return likePosts;
    },
    commentPosts: async (user) => {
        const query = `
            SELECT DISTINCT P.*
            FROM Post P
            JOIN Comment C ON P.post_id = C.post_id
            WHERE C.user_id = ?;
            `;
        const commentPosts = await db.query(query, [user.user_id]);
        return commentPosts;
    },

}