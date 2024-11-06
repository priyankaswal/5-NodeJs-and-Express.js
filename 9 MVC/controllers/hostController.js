const Home = require("./../models/Home");

exports.getAddHome = (req, res, next) => {
  res.render("add-home", { pageTitle: "Host Your Home" });
};

exports.postAddHome = (req, res, next) => {
  // const houseName = req.body.houseName;
  // const price = req.body.price;
  // const location = req.body.location;
  // const rating = req.body.rating;
  // const photoUrl = req.body.photoUrl;
  const { houseName, price, location, rating, photoUrl } = req.body;
  const newHome = new Home(houseName, price, location, rating, photoUrl);
  newHome.save((error) => {
    if (error) {
      res.redirect("/");
    } else {
      res.render("home-added", { pageTitle: "Home Hosted" });
    }
  });
};
