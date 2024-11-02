const express = require("express");
const path = require("path");
const contactRouter = express.Router();
const rootDir = require("../util/path-util");

contactRouter.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact-us.html"));
});

contactRouter.post("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "handled-post-rqst.html"));
});

module.exports = contactRouter;
