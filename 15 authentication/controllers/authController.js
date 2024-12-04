exports.getLogin = (req, res, next) => {
  res.render("auth/login", { pageTitle: "Login", isLoggedIn: false });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", { pageTitle: "Signup", isLoggedIn: false });
};

exports.postSignup = (req, res, next) => {
  console.log('User came for signup: ', req.body);
  res.redirect("/login");
}; 