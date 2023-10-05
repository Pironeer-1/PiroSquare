const apiModel = require('../models/apiModel.js');

module.exports = {
    getUser: async (req, res) => {
        console.log('req.session', req.session);
        req.session.user = req.user;
        if (!req.session || !req.session.passport || !req.session.passport.user) {
            res.status(400).send({ data: null, message: 'not authorized' });
        } else {
            const user = await req.user;
            if (!user){
                res.status(400).send({ data: null, message: 'not user' });
            }  else {
                res.json({ data: user, message: 'ok' });
            }
        }
    },
}