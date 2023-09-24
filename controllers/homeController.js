// Models
const homeModel = require('../models/homeModel.js');

module.exports = {
    home: async (req, res) => {
        const users = await homeModel.getTest();
    
        res.render('home.ejs', {users: users});
    }
}