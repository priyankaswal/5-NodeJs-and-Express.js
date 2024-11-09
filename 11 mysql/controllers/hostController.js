const e = require("express");
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

  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("/host/host-homes");
    }
    console.log(homeId, editing, home);
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
  const { houseName, price, location, rating, photoUrl } = req.body;
  const newHome = new Home(houseName, price, location, rating, photoUrl);
  newHome.save((error) => {
    if (error) {
      res.redirect("/");
    } else {
      res.render("host/home-added", { pageTitle: "Home Hosted" });
    }
  });
};

exports.postEditHome = (req , res , next) => {
  const {id, houseName, price, location, rating, photoUrl} = req.body;
  const newHome = new Home(houseName, price, location, rating, photoUrl);
  newHome.id = id;
  newHome.save((error) => {
    if (error) {
      console.log("Error while updating home" , error);
    } else {
      res.redirect("/host/host-homes"); 
    }
  });
}

exports.postDeleteHome = (req , res , next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId , error => {
    if(error){
      console.log("error occured while deleting homes" , error);
    }
    res.redirect("/host/host-homes"); 
  })
}

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("host/host-homes", {
      homes: registeredHomes,
      pageTitle: "Host Homes",
    });
  });
};
