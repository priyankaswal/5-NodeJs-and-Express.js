const Favourite = require("../models/Favourite");
const Home = require("./../models/Home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", { editing: false, pageTitle: "Host Your Home" });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  if (!editing) {
    console.log("Editing flag not set properly");
    return res.redirect("/host/host-homes");
  }

  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("/host/host-homes");
    }
    res.render("host/edit-home", {
      home: home,
      editing: editing,
      pageTitle: "Edit Your Home",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;
  const newHome = new Home(
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description
  );

  newHome
    .save()
    .then(([rows]) =>
      res.render("host/home-added", { pageTitle: "Home Hosted" })
    );
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;
  const newHome = new Home(
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description
  );
  newHome.id = id;
  newHome
    .save()
    .then(() => {
      res.redirect("/host/host-homes");
    })
    .catch((error) => {
      console.log("Error while updating home", error);
      res.redirect("/host/host-homes");
    });
};

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId).then(() => {
    res.redirect("/host/host-homes");
  });

  // try {
  //   const homeId = req.params.homeId;

  //   await Promise.all([
  //     Home.deleteById(homeId),
  //     Favourite.deleteById(homeId)
  //   ]);
  //   res.redirect("/host/host-homes");
  // } catch (err) {
  //   console.log("Error while deleting home:", err);
  // }
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("host/host-homes", {
      homes: registeredHomes,
      pageTitle: "Host Homes",
    });
  });
};
