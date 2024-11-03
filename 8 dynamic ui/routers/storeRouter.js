const express = require("express");
const storeRouter = express.Router();
const { registeredHomes } = require("./hostRouter");

storeRouter.get("/", (req, res, next) => {
  console.log(registeredHomes);
  res.render("index", { homes: registeredHomes, pageTitle: "Hmara Airbnb" });
});

module.exports = storeRouter;
