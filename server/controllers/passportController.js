const passport = require("passport");
const { Strategy: NaverStrategy } = require("passport-naver-v2");
const cookieParser = require("cookie-parser");
const loginModel = require("../models/loginModel");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  app.use(cors(corsOptions));

  passport.serializeUser(function (user, done) {
    done(null, user.ID);
  });

  passport.deserializeUser(function (id, done) {
    const authData = loginModel.getUser(id);
    done(null, authData);
  });

  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: "naver/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log("Naver Strategy profile:", profile);
        try {
          const exUser = await loginModel.getUser(profile.id);
          if (exUser) {
            return done(null, exUser);
          } else {
            const newUser = await loginModel.createUser({
              name: profile.name,
              ID: profile.id,
              nickname: profile.nickname,
            });
            newUser.newUser = true;
            return done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );

  app.get("/naver", passport.authenticate("naver", { authType: "reprompt" }));
  app.get(
    "/naver/callback",
    passport.authenticate("naver", { failureRedirect: "/" }),
    (req, res) => {
      req.session.user = req.user;
      console.log("res.user", req.user);
      console.log("res.user.newUser", req.user.newUser);
      console.log('req.user.year', req.user.year);
      res.cookie("sessionID", req.sessionID, { maxAge: 1000 * 60 * 60 * 24 });
      if (!req.user.is_active || !req.user.year) {
        return res.redirect("http://localhost:3000/my-page/update");
      } 
      // res.send();
      res.redirect("http://localhost:3000/");
    }
  );

  return passport;
};
