module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Login neccessary!");
    return res.redirect("/login");
  }
  next();
};
