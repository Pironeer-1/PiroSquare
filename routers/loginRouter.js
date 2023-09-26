const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController.js');

module.exports = (passport) => {

    router.get('/', loginController.getLogin);

    router.post('/process', loginController.loginProcess);

    return router;
}