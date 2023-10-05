//loginController.js
const passport = require("passport");
const loginModel = require("../models/loginModel");

module.exports = {
  logoutProcess: async (req, res) => {
    if (!req.session || !req.session.passport || !req.session.passport.user) {
      res.status(400).send({ data: null, message: "not authorized" });
    } else {
      req.session.destroy();
      res.json({ data: null, message: "ok" });
    }
  },
  newUser: async (req, res) => {
    res.render("mypage/newUserProfile.ejs");
  },
  newUserProfile: async (req, res) => {
    const user = await req.user;
    const loginUser = req.body;
    const imagePath = req.file ? `http://localhost:8000/user/${req.file.filename}` : "";
    await loginModel.newUserProfile(user, loginUser, imagePath);
    const handleLoginComplete = () => {
      popup.close();
      res.status(200).json({ data: user, message: "ok" });
    };
    handleLoginComplete();
  },
  activateUser: async (req, res) => {
    const user_id = await req.params.user_id;
    await loginModel.activateUser(user_id);
    res.redirect('/auth/manageUsers');
  },
  manageUsers: async (req, res) => {
    const users = await loginModel.getUsers();
    res.render('admin/manageUsers.ejs', {users: users});
  },
  deactivateUser: async (req, res) => {
    const user_id = await req.params.user_id;
    await loginModel.deactivateUser(user_id);
    res.redirect('/auth/manageUsers');
  },
};
