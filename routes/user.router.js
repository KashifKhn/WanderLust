const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares/middlewares");
const {
  signupUser,
  renderSignupForm,
  renderLoginForm,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");

router.route("/signup").get(renderSignupForm).post(wrapAsync(signupUser));

router
  .route("/login")
  .get(renderLoginForm)
  .post(
    
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(loginUser)
  );

router.get("/logout", logoutUser);

module.exports = router;
