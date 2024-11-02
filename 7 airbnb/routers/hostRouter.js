const path = require("path");
const express = require("express");
const hostRouter = express.Router();
const rootDir = require('../util/path-util');

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-home.html"));
});

hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir,"views", "home-added.html"));
});

module.exports = hostRouter;
