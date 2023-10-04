const apiModel = require('../models/apiModel.js');

module.exports = {
    getUser: async (req, res) => {
        console.log('req.session', req.session);
        if (!req.session || !req.session.passport || !req.session.passport.user) {
            res.status(400).send({ data: null, message: 'not authorized' });
        } else {
            const user = await req.user;
            res.json({ data: user, message: 'ok' });
        }
    },
}