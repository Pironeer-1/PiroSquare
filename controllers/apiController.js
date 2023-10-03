const apiModel = require('../models/apiModel.js');

module.exports = {
    getUser: async (req,res) => {
        if (!req.session.passport,user) {
            res.status(400).send({ data: null, message: 'not authorized' });
        } else {
            const user = await req.user;
            res.json({data: user, message: 'ok'});
        }
    },
}