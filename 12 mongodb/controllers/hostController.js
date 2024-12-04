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

  Home.findById(homeId).then((home) => {
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
  // const houseName = req.body.houseName;
  // const price = req.body.price;
  // const location = req.body.location;
  // const rating = req.body.rating;
  // const photoUrl = req.body.photoUrl;
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

  newHome.save().then((rows) => res.redirect("/host/host-homes"));
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
    description,
    id
  );

  newHome
    .save()
    .then((result) => {
      if (result.matchedCount === 0) {
        console.log("No matching document found for update");
      } else if (result.modifiedCount === 0) {
        console.log("Document found, but no changes were made");
      } else {
        console.log("Home updated successfully");
      }
      res.redirect("/host/host-homes");
    })
    .catch((error) => {
      console.log("Error while updating home", error);
      res.redirect("/host/host-homes");
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId).then(() => {
    res.redirect("/host/host-homes");
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("host/host-homes", {
      homes: registeredHomes,
      pageTitle: "Host Homes",
    });
  });
};
