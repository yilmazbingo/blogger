const passport = require("passport");

exports.getGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.getCallback = (req, res) => {
  res.redirect("/blogs");
};

//passport.js attaches logout() to the req object
exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.currentUser = (req, res) => {
  res.send(req.user);
};
