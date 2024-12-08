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
const mongodb_session = require("connect-mongodb-session");
const multer = require("multer");

const MongoDBStore = mongodb_session(session);

const MONGO_DB_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@airbnb.346l3.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority&appName=Airbnb`;

const sessionStore = new MongoDBStore({
  uri: MONGO_DB_URL,
  collection: "sessions",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "_") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  // const isValidFile = file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg';

  const isValidFile = ["image/png", "image/jpeg", "image/jpg"].includes(
    file.mimetype
  );

  cb(null, isValidFile);
};

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ storage, fileFilter }).single("photo"));

const SESSION_SECRET = process.env.SESSION_SECRET;
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

const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});