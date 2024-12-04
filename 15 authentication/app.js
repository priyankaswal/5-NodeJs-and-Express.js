require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const rootDir = require("./util/path-util");
const mongoose = require("mongoose");
const { authRouter } = require("./routers/authRouter");
const session = require("express-session");
const { hostRouter } = require("./routers/hostRouter");
const storeRouter = require("./routers/storeRouter");
const errorController = require("./controllers/errorController");
const { collection } = require("./models/Favourite");
const mongodb_session = require("connect-mongodb-session");

const MongoDBStore = mongodb_session(session);

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStore = new MongoDBStore({
  uri: MONGO_DB_URL,
  collection: "sessions",
});

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

// app.use((req, res, next) => {
//   req.isLoggedIn = req.get("Cookie").split("=")[1] === "true";
//   next();
// });

app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});

app.use("/host", hostRouter);
app.use(authRouter);
app.use(errorController.get404);

const PORT = 3000;

mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
