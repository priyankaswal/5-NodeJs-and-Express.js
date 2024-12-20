const Favourite = require("../models/Favourite");
const Home = require("./../models/Home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/index", {
      homes: registeredHomes,
      pageTitle: "Hmara Airbnb",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/homes", {
      homes: registeredHomes,
      pageTitle: "Hmara Airbnb",
    });
  });
};

exports.getFavourites = (req, res, next) => {
  Favourite.fetchAll().then(([favouriteIdObjects]) => {
    const favouriteIds = favouriteIdObjects.map(
      (favouriteIdObject) => favouriteIdObject.favIds
    );

    Home.fetchAll().then(([registeredHomes]) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favouriteIds.includes(home.id)
      );
      res.render("store/favourites", {
        homes: favouriteHomes,
        pageTitle: "Favourites",
      });
    });
  });
};

exports.postAddFavourites = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.addToFavourites(homeId)
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((error) => {
      if (error) {
        console.log("Error while adding to favourites", error);
        res.redirect("/favourites");
      }
    });
};

exports.postRemoveFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId)
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((error) => {
      if (error) {
        console.log("Error while remove from favourites");
        res.redirect("/favourites");
      }
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      console.log("Home not found");
      return res.redirect("/homes");
    }
    res.render("store/home-detail", { home: home, pageTitle: "Home Detail" });
  });
};
