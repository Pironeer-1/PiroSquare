const apiModel = require('../models/apiModel.js');

module.exports = {
    getUser: async (req,res) => {
        const user = await apiModel.getUser(req.user.ID);
        req.json({user:user});
    },
}