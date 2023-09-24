// Models
const homeModel = require('../models/homeModel.js');

module.exports = {
    home: async (req, res) => {
        const topics = await homeModel.getTest();
    
        res.render('home.ejs', {topics: topics});
    }
}