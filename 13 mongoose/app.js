require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const rootDir = require("./util/path-util");
const mongoose = require("mongoose");

const { hostRouter } = require("./routers/hostRouter");
const storeRouter = require("./routers/storeRouter");
const errorController = require("./controllers/errorController");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(storeRouter);
app.use("/host", hostRouter);
app.use(errorController.get404);

const PORT = 3000;
const MONGO_DB_URL = process.env.MONGO_DB_URL;
mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
