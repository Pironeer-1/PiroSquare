const db = require('../config/db.js');

module.exports = {

    getAll: async()=>{
        const query = "SELECT * FROM Post where board_type_id='2';"
        const informs = await db.query(query);
        return informs[0];
    },

    detail: async (postId) => {
        const query = "SELECT * FROM Post where post_id=? and board_type_id='2';"
        const inform = await db.query(query, [postId]);
        console.log(inform[0][0]);
        return inform[0][0];
    },
    
}