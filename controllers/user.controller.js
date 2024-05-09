const User = require("../models/user.model");

const renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

const signupUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body.user;
    const newUser = new User({ username, email });
    const registerUser = await User.register(newUser, password);
    req.login(registerUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome To wanderLust");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

const renderLoginForm = (req, res) => {
  res.render("users/login");
};

const loginUser = async (req, res) => {
  req.flash("success", "Welcome You Logged In");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

const logoutUser = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    req.flash("success", "You are logout");
    res.redirect("/listings");
  });
};

module.exports = {
  renderSignupForm,
  signupUser,
  renderLoginForm,
  loginUser,
  logoutUser,
};
